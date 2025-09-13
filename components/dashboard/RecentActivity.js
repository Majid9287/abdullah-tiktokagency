"use client";

import { useState, useEffect } from "react";
import { Clock, User, Calendar, Users, MapPin, Image, Settings, ArrowRight } from "lucide-react";

export default function RecentActivity() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/activities?limit=20');
      const data = await response.json();
      
      if (response.ok) {
        setActivities(data.activities || []);
      } else {
        setError(data.error || 'Failed to fetch activities');
      }
    } catch (err) {
      setError('Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type, action) => {
    const iconClass = "h-4 w-4";
    
    switch (type) {
      case 'user':
        return <User className={`${iconClass} text-blue-500`} />;
      case 'event':
        return <Calendar className={`${iconClass} text-green-500`} />;
      case 'mentor':
        return <Users className={`${iconClass} text-purple-500`} />;
      case 'country':
        return <MapPin className={`${iconClass} text-orange-500`} />;
      case 'media':
        return <Image className={`${iconClass} text-pink-500`} />;
      case 'system':
        return <Settings className={`${iconClass} text-gray-500`} />;
      default:
        return <Clock className={`${iconClass} text-gray-500`} />;
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'user':
        return 'bg-blue-100 text-blue-800';
      case 'event':
        return 'bg-green-100 text-green-800';
      case 'mentor':
        return 'bg-purple-100 text-purple-800';
      case 'country':
        return 'bg-orange-100 text-orange-800';
      case 'media':
        return 'bg-pink-100 text-pink-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) {
      return 'Just now';
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 2592000) {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} day${days > 1 ? 's' : ''} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500 mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading activities...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-8 text-center">
            <p className="text-red-500 mb-2">Error loading activities</p>
            <button 
              onClick={fetchActivities}
              className="text-pink-600 hover:text-pink-700 text-sm font-medium"
            >
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity, index) => (
                  <tr key={activity._id || index} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type, activity.action)}
                        </div>
                        <div className="ml-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${getActivityColor(activity.type)}`}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.userName}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">
                        {activity.action.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={activity.description}>
                        {activity.description}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTimeAgo(activity.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDateTime(activity.createdAt)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No recent activity</h3>
            <p className="text-gray-500">Activities will appear here as you use the dashboard</p>
          </div>
        )}
        
        <div className="p-4 border-t bg-gray-50">
          <button className="text-pink-600 hover:text-pink-700 text-sm font-medium flex items-center">
            View All Activity
            <ArrowRight className="h-4 w-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
}