import connectToDatabase from './mongodb';
import Activity from '@/models/Activity';

/**
 * Log an activity to the database
 * @param {Object} params - Activity parameters
 * @param {string} params.type - Type of activity (user, event, mentor, etc.)
 * @param {string} params.action - Action performed (created, updated, deleted, etc.)
 * @param {string} params.entityType - Type of entity affected
 * @param {string} params.entityId - ID of entity affected
 * @param {string} params.entityName - Name of entity affected
 * @param {string} params.description - Human-readable description
 * @param {Object} params.user - User performing the action
 * @param {Object} params.changes - Changes made (for updates)
 * @param {Object} params.metadata - Additional metadata
 * @param {Object} params.request - Request object (for IP and user agent)
 */
export async function logActivity({
  type,
  action,
  entityType,
  entityId,
  entityName,
  description,
  user,
  changes = {},
  metadata = {},
  request = null
}) {
  try {
    await connectToDatabase();

    const activity = new Activity({
      type,
      action,
      entityType,
      entityId,
      entityName,
      description,
      userId: user.id || user._id,
      userName: user.name,
      userEmail: user.email,
      changes,
      metadata,
      ipAddress: request?.ip || request?.headers?.['x-forwarded-for'] || request?.connection?.remoteAddress,
      userAgent: request?.headers?.['user-agent']
    });

    await activity.save();
    return activity;
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error to prevent breaking the main operation
    return null;
  }
}

/**
 * Get recent activities with pagination
 * @param {Object} params - Query parameters
 * @param {number} params.limit - Number of activities to return
 * @param {number} params.skip - Number of activities to skip
 * @param {string} params.userId - Filter by user ID
 * @param {string} params.type - Filter by activity type
 * @param {string} params.action - Filter by action
 */
export async function getActivities({
  limit = 20,
  skip = 0,
  userId = null,
  type = null,
  action = null
} = {}) {
  try {
    await connectToDatabase();

    const query = {};
    if (userId) query.userId = userId;
    if (type) query.type = type;
    if (action) query.action = action;

    const activities = await Activity.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip)
      .populate('userId', 'name email image')
      .lean();

    const total = await Activity.countDocuments(query);

    return {
      activities,
      total,
      hasMore: skip + limit < total
    };
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { activities: [], total: 0, hasMore: false };
  }
}

/**
 * Get activity statistics
 */
export async function getActivityStats() {
  try {
    await connectToDatabase();

    const stats = await Activity.aggregate([
      {
        $group: {
          _id: {
            type: '$type',
            action: '$action'
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: '$_id.type',
          actions: {
            $push: {
              action: '$_id.action',
              count: '$count'
            }
          },
          total: { $sum: '$count' }
        }
      }
    ]);

    return stats;
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return [];
  }
}

/**
 * Helper function to create activity descriptions
 */
export function createActivityDescription(type, action, entityName, changes = {}) {
  const descriptions = {
    user: {
      created: `User "${entityName}" was created`,
      updated: `User "${entityName}" was updated`,
      deleted: `User "${entityName}" was deleted`,
      role_changed: `User "${entityName}" role was changed`,
      password_changed: `User "${entityName}" password was changed`,
      activated: `User "${entityName}" was activated`,
      deactivated: `User "${entityName}" was deactivated`
    },
    event: {
      created: `Event "${entityName}" was created`,
      updated: `Event "${entityName}" was updated`,
      deleted: `Event "${entityName}" was deleted`,
      reordered: `Event "${entityName}" order was changed`,
      activated: `Event "${entityName}" was activated`,
      deactivated: `Event "${entityName}" was deactivated`
    },
    mentor: {
      created: `Mentor "${entityName}" was added`,
      updated: `Mentor "${entityName}" was updated`,
      deleted: `Mentor "${entityName}" was removed`,
      reordered: `Mentor "${entityName}" order was changed`,
      activated: `Mentor "${entityName}" was activated`,
      deactivated: `Mentor "${entityName}" was deactivated`
    },
    country: {
      created: `Country "${entityName}" was added`,
      updated: `Country "${entityName}" was updated`,
      deleted: `Country "${entityName}" was removed`
    },
    media: {
      uploaded: `Media "${entityName}" was uploaded`,
      deleted: `Media "${entityName}" was deleted`,
      updated: `Media "${entityName}" was updated`
    },
    system: {
      login: `User logged in`,
      logout: `User logged out`,
      searched: `Search performed for "${entityName}"`
    }
  };

  let description = descriptions[type]?.[action] || `${action} ${entityName}`;
  
  // Add change details for updates
  if (action === 'updated' && Object.keys(changes).length > 0) {
    const changeList = Object.keys(changes).join(', ');
    description += ` (${changeList} changed)`;
  }

  return description;
}
