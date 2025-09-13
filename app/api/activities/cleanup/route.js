import connectToDatabase from '@/lib/mongodb';
import Activity from '@/models/Activity';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

// POST /api/activities/cleanup - Manual cleanup of old activities
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow system admins to trigger manual cleanup
    if (!session.user.isSystemAdmin) {
      return Response.json({ error: 'Forbidden - System admin required' }, { status: 403 });
    }

    await connectToDatabase();
    
    // Calculate date 2 months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    // Count activities to be deleted first
    const countToDelete = await Activity.countDocuments({
      createdAt: { $lt: twoMonthsAgo }
    });
    
    // Delete activities older than 2 months
    const result = await Activity.deleteMany({
      createdAt: { $lt: twoMonthsAgo }
    });
    
    return Response.json({ 
      success: true,
      message: `Successfully cleaned up ${result.deletedCount} old activities`,
      deletedCount: result.deletedCount,
      cutoffDate: twoMonthsAgo.toISOString()
    });
  } catch (error) {
    console.error('Error cleaning up old activities:', error);
    return Response.json({ error: 'Failed to cleanup activities' }, { status: 500 });
  }
}

// GET /api/activities/cleanup - Get cleanup statistics
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Only allow system admins to view cleanup stats
    if (!session.user.isSystemAdmin) {
      return Response.json({ error: 'Forbidden - System admin required' }, { status: 403 });
    }

    await connectToDatabase();
    
    // Calculate date 2 months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    // Get statistics
    const totalActivities = await Activity.countDocuments();
    const oldActivities = await Activity.countDocuments({
      createdAt: { $lt: twoMonthsAgo }
    });
    const recentActivities = totalActivities - oldActivities;
    
    return Response.json({
      totalActivities,
      oldActivities,
      recentActivities,
      cutoffDate: twoMonthsAgo.toISOString(),
      cleanupRecommended: oldActivities > 0
    });
  } catch (error) {
    console.error('Error getting cleanup statistics:', error);
    return Response.json({ error: 'Failed to get cleanup statistics' }, { status: 500 });
  }
}
