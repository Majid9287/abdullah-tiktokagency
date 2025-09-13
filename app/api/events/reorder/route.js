import connectToDatabase from '@/lib/mongodb';
import Event from '@/models/Event';
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

    // Get both events
    const draggedEvent = await Event.findById(draggedId);
    const targetEvent = await Event.findById(targetId);

    if (!draggedEvent || !targetEvent) {
      return Response.json({ error: 'Event not found' }, { status: 404 });
    }

    // Swap their order values
    const tempOrder = draggedEvent.order;
    draggedEvent.order = targetEvent.order;
    targetEvent.order = tempOrder;

    // Save both events
    await draggedEvent.save();
    await targetEvent.save();

    // Invalidate all event caches
    try {
      await invalidateEventCaches();
    } catch (cacheError) {
      console.warn('Cache invalidation error:', cacheError);
      // Don't fail the request if cache invalidation fails
    }

    // Log activity for both events
    await logActivity({
      type: 'event',
      action: 'reordered',
      entityType: 'event',
      entityId: draggedEvent._id,
      entityName: draggedEvent.title,
      description: createActivityDescription('event', 'reordered', draggedEvent.title),
      user: session.user,
      changes: { order: { from: tempOrder, to: targetEvent.order } },
      request
    });

    await logActivity({
      type: 'event',
      action: 'reordered',
      entityType: 'event',
      entityId: targetEvent._id,
      entityName: targetEvent.title,
      description: createActivityDescription('event', 'reordered', targetEvent.title),
      user: session.user,
      changes: { order: { from: targetEvent.order, to: tempOrder } },
      request
    });

    return Response.json({ success: true, message: 'Events reordered successfully' });
  } catch (error) {
    console.error('Error reordering events:', error);
    return Response.json({ error: 'Failed to reorder events' }, { status: 500 });
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
