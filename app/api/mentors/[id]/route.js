import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import redis from '@/lib/redis';

// GET /api/mentors/[id] - Get single mentor
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const mentor = await Mentor.findById(id);

    if (!mentor) {
      return Response.json({ error: 'Mentor not found' }, { status: 404 });
    }

    return Response.json(mentor);
  } catch (error) {
    console.error('Error fetching mentor:', error);
    return Response.json({ error: 'Failed to fetch mentor' }, { status: 500 });
  }
}

// PUT /api/mentors/[id] - Update mentor
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();
    const { id } = await params;

    // Get original mentor for comparison
    const originalMentor = await Mentor.findById(id);
    if (!originalMentor) {
      return Response.json({ error: 'Mentor not found' }, { status: 404 });
    }

    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Track changes
    const changes = {};
    Object.keys(data).forEach(key => {
      if (originalMentor[key] !== data[key]) {
        changes[key] = {
          from: originalMentor[key],
          to: data[key]
        };
      }
    });

    // Invalidate all mentor caches
    try {
      await invalidateMentorCaches();
    } catch (cacheError) {
      console.warn('Cache invalidation error:', cacheError);
      // Don't fail the request if cache invalidation fails
    }

    // Log activity
    await logActivity({
      type: 'mentor',
      action: 'updated',
      entityType: 'mentor',
      entityId: mentor._id,
      entityName: mentor.name,
      description: createActivityDescription('mentor', 'updated', mentor.name, changes),
      user: session.user,
      changes,
      request
    });

    return Response.json(mentor);
  } catch (error) {
    console.error('Error updating mentor:', error);
    return Response.json({ error: 'Failed to update mentor' }, { status: 500 });
  }
}

// DELETE /api/mentors/[id] - Delete mentor
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;

    const mentor = await Mentor.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!mentor) {
      return Response.json({ error: 'Mentor not found' }, { status: 404 });
    }

    // Invalidate all mentor caches
    try {
      await invalidateMentorCaches();
    } catch (cacheError) {
      console.warn('Cache invalidation error:', cacheError);
      // Don't fail the request if cache invalidation fails
    }

    // Log activity
    await logActivity({
      type: 'mentor',
      action: 'deleted',
      entityType: 'mentor',
      entityId: mentor._id,
      entityName: mentor.name,
      description: createActivityDescription('mentor', 'deleted', mentor.name),
      user: session.user,
      request
    });

    return Response.json({ message: 'Mentor deleted successfully' });
  } catch (error) {
    console.error('Error deleting mentor:', error);
    return Response.json({ error: 'Failed to delete mentor' }, { status: 500 });
  }
}

// Helper function to invalidate all mentor caches
async function invalidateMentorCaches() {
  try {
    // Get all mentor cache keys
    const keys = await redis.keys('mentors:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Error invalidating mentor caches:', error);
    throw error;
  }
}
