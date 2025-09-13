import connectToDatabase from '@/lib/mongodb';
import { getActivities, getActivityStats } from '@/lib/activityLogger';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Activity from '@/models/Activity';

// GET /api/activities - Get activities with pagination and filters
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = parseInt(searchParams.get('skip')) || 0;
    const userId = searchParams.get('userId');
    const type = searchParams.get('type');
    const action = searchParams.get('action');
    const stats = searchParams.get('stats') === 'true';

    // Clean up old activities (older than 2 months) before fetching
    await cleanupOldActivities();

    if (stats) {
      const activityStats = await getActivityStats();
      return Response.json({ stats: activityStats });
    }

    const result = await getActivities({
      limit,
      skip,
      userId,
      type,
      action
    });

    return Response.json(result);
  } catch (error) {
    console.error('Error fetching activities:', error);
    return Response.json({ error: 'Failed to fetch activities' }, { status: 500 });
  }
}

// Helper function to clean up activities older than 2 months
async function cleanupOldActivities() {
  try {
    await connectToDatabase();
    
    // Calculate date 2 months ago
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    
    // Delete activities older than 2 months
    const result = await Activity.deleteMany({
      createdAt: { $lt: twoMonthsAgo }
    });
    
    if (result.deletedCount > 0) {
      console.log(`Cleaned up ${result.deletedCount} old activities (older than 2 months)`);
    }
  } catch (error) {
    console.error('Error cleaning up old activities:', error);
    // Don't throw error to avoid breaking the main request
  }
}
