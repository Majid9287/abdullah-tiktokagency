import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import redis, { redisHelpers } from '@/lib/redis';

// GET /api/events - Get all events with search
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const type = searchParams.get('type') || '';
    const showAll = searchParams.get('showAll') === 'true';

    // Create cache key based on search parameters
    const cacheKey = `events:${search}:${type}:${showAll}`;

    // Try to get from cache first
    try {
      const cachedEvents = await redisHelpers.get(cacheKey);
      if (cachedEvents) {
        return Response.json({ events: cachedEvents });
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
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    // Get all results
    const events = await Event.find(query)
      .sort({ order: 1, createdAt: -1 });

    // Cache the results for 30 days (2592000 seconds)
    try {
      await redisHelpers.setex(cacheKey, 2592000, events);
    } catch (cacheError) {
      console.warn('Cache write error:', cacheError);
      // Don't fail the request if caching fails
    }

    return Response.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return Response.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

// POST /api/events - Create new event
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();

    const event = await Event.create(data);

    // Invalidate all event caches
    try {
      await invalidateEventCaches();
    } catch (cacheError) {
      console.warn('Cache invalidation error:', cacheError);
      // Don't fail the request if cache invalidation fails
    }

    // Log activity
    await logActivity({
      type: 'event',
      action: 'created',
      entityType: 'event',
      entityId: event._id,
      entityName: event.title,
      description: createActivityDescription('event', 'created', event.title),
      user: session.user,
      request
    });

    return Response.json(event, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return Response.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

// Helper function to invalidate all event caches
async function invalidateEventCaches() {
  try {
    // Get all event cache keys
    const keys = await redis.keys('events:*');
    if (keys.length > 0) {
      await redis.del(...keys);
    }
  } catch (error) {
    console.error('Error invalidating event caches:', error);
    throw error;
  }
}
