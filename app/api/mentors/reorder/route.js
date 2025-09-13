import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import redis from '@/lib/redis';

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { draggedId, targetId } = await request.json();

    if (!draggedId || !targetId) {
      return Response.json({ error: 'Missing draggedId or targetId' }, { status: 400 });
    }

    await connectToDatabase();

    // Get both mentors
    const draggedMentor = await Mentor.findById(draggedId);
    const targetMentor = await Mentor.findById(targetId);

    if (!draggedMentor || !targetMentor) {
      return Response.json({ error: 'Mentor not found' }, { status: 404 });
    }

    // Swap their order values
    const tempOrder = draggedMentor.order;
    draggedMentor.order = targetMentor.order;
    targetMentor.order = tempOrder;

    // Save both mentors
    await draggedMentor.save();
    await targetMentor.save();

    // Invalidate all mentor caches
    try {
      await invalidateMentorCaches();
    } catch (cacheError) {
      console.warn('Cache invalidation error:', cacheError);
      // Don't fail the request if cache invalidation fails
    }

    // Log activity for both mentors
    await logActivity({
      type: 'mentor',
      action: 'reordered',
      entityType: 'mentor',
      entityId: draggedMentor._id,
      entityName: draggedMentor.name,
      description: createActivityDescription('mentor', 'reordered', draggedMentor.name),
      user: session.user,
      changes: { order: { from: tempOrder, to: targetMentor.order } },
      request
    });

    await logActivity({
      type: 'mentor',
      action: 'reordered',
      entityType: 'mentor',
      entityId: targetMentor._id,
      entityName: targetMentor.name,
      description: createActivityDescription('mentor', 'reordered', targetMentor.name),
      user: session.user,
      changes: { order: { from: targetMentor.order, to: tempOrder } },
      request
    });

    return Response.json({ success: true, message: 'Mentors reordered successfully' });
  } catch (error) {
    console.error('Error reordering mentors:', error);
    return Response.json({ error: 'Failed to reorder mentors' }, { status: 500 });
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
