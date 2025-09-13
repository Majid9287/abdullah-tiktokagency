import connectToDatabase from '@/lib/mongodb';
import Mentor from '@/models/Mentor';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import redis, { redisHelpers } from '@/lib/redis';

// GET /api/mentors - Get all mentors with search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const showAll = searchParams.get('showAll') === 'true';

    // Create cache key based on search parameters
    const cacheKey = `mentors:${search}:${showAll}`;

    // Try to get from cache first
    try {
      const cachedMentors = await redisHelpers.get(cacheKey);
      if (cachedMentors) {
        return Response.json({ mentors: cachedMentors });
      }
    } catch (cacheError) {
      console.warn('Cache read error:', cacheError);
      // Continue to database if cache fails
    }

    await connectToDatabase();

    // Build search query
    let query = {};
    if (!showAll) {
      query.isActive = true;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { title: { $regex: search, $options: 'i' } },
        { bio: { $regex: search, $options: 'i' } }
      ];
    }

    // Get all results
    const mentors = await Mentor.find(query)
      .sort({ order: 1, createdAt: -1 });

    // Cache the results for 30 days (2592000 seconds)
    try {
      await redisHelpers.setex(cacheKey, 2592000, mentors);
    } catch (cacheError) {
      console.warn('Cache write error:', cacheError);
      // Don't fail the request if caching fails
    }

    return Response.json({ mentors });
  } catch (error) {
    console.error('Error fetching mentors:', error);
    return Response.json({ error: 'Failed to fetch mentors' }, { status: 500 });
  }
}

// POST /api/mentors - Create new mentor
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();

    const mentor = await Mentor.create(data);

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
      action: 'created',
      entityType: 'mentor',
      entityId: mentor._id,
      entityName: mentor.name,
      description: createActivityDescription('mentor', 'created', mentor.name),
      user: session.user,
      request
    });

    return Response.json(mentor, { status: 201 });
  } catch (error) {
    console.error('Error creating mentor:', error);
    return Response.json({ error: 'Failed to create mentor' }, { status: 500 });
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
