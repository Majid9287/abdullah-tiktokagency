import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
import { logActivity, createActivityDescription } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import redis from '@/lib/redis';

// GET /api/events/[id] - Get single event
export async function GET(request, { params }) {
  try {
    await connectToDatabase();
    const { id } = await params;
    const event = await Event.findById(id);

    if (!event) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    return Response.json(event);
  } catch (error) {
    console.error('Error fetching event:', error);
    return Response.json({ error: 'Failed to fetch event' }, { status: 500 });
  }
}

// PUT /api/events/[id] - Update event
export async function PUT(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await connectToDatabase();
    const { id } = await params;

    // Get original event for comparison
    const originalEvent = await Event.findById(id);
    if (!originalEvent) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    const event = await Event.findByIdAndUpdate(
      id,
      { ...data, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Track changes
    const changes = {};
    Object.keys(data).forEach(key => {
      if (originalEvent[key] !== data[key]) {
        changes[key] = {
          from: originalEvent[key],
          to: data[key]
        };
      }
    });

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
      action: 'updated',
      entityType: 'event',
      entityId: event._id,
      entityName: event.title,
      description: createActivityDescription('event', 'updated', event.title, changes),
      user: session.user,
      changes,
      request
    });

    return Response.json(event);
  } catch (error) {
    console.error('Error updating event:', error);
    return Response.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

// DELETE /api/events/[id] - Delete event
export async function DELETE(request, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();
    const { id } = await params;

    const event = await Event.findByIdAndUpdate(
      id,
      { isActive: false, updatedAt: new Date() },
      { new: true }
    );

    if (!event) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

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
      action: 'deleted',
      entityType: 'event',
      entityId: event._id,
      entityName: event.title,
      description: createActivityDescription('event', 'deleted', event.title),
      user: session.user,
      request
    });

    return Response.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Error deleting event:', error);
    return Response.json({ error: 'Failed to delete event' }, { status: 500 });
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
