"use client";

import { useState, useEffect, useCallback } from "react";
import { Clock, User, Calendar, Users, MapPin, Image, Settings, Filter, Search, RefreshCw, Trash2 } from "lucide-react";
import Pagination from "@/components/Pagination";
import ConfirmationModal from "@/components/ConfirmationModal";
import { useSession } from "next-auth/react";

export default function ActivitiesPage() {
  const { data: session } = useSession();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    action: 'all',
    limit: 20
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showCleanupModal, setShowCleanupModal] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleanupStats, setCleanupStats] = useState(null);

  const fetchActivities = useCallback(async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.type !== 'all') params.append('type', filters.type);
      if (filters.action !== 'all') params.append('action', filters.action);
      params.append('limit', filters.limit.toString());
      const skip = (currentPage - 1) * filters.limit;
      params.append('skip', skip.toString());

      const response = await fetch(`/api/activities?${params}`);
      const data = await response.json();
      
      if (response.ok) {
        setActivities(data.activities || []);
        setTotal(data.total || 0);
      } else {
        setError(data.error || 'Failed to fetch activities');
      }
    } catch (err) {
      setError('Failed to fetch activities');
      console.error('Error fetching activities:', err);
    } finally {
      setLoading(false);
    }
  }, [filters, currentPage]);

  useEffect(() => {
    fetchActivities();
  }, [fetchActivities]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const resetFilters = () => {
    setFilters({
      type: 'all',
      action: 'all',
      limit: 20
    });
    setCurrentPage(1);
  };

  const fetchCleanupStats = async () => {
    try {
      const response = await fetch('/api/activities/cleanup');
      if (response.ok) {
        const stats = await response.json();
        setCleanupStats(stats);
      }
    } catch (error) {
      console.error('Error fetching cleanup stats:', error);
    }
  };

  const handleCleanup = () => {
    fetchCleanupStats();
    setShowCleanupModal(true);
  };

  const confirmCleanup = async () => {
    try {
      setIsCleaning(true);
      const response = await fetch('/api/activities/cleanup', {
        method: 'POST'
      });
      
      if (response.ok) {
        const result = await response.json();
        alert(`Successfully cleaned up ${result.deletedCount} old activities`);
        setShowCleanupModal(false);
        fetchActivities(); // Refresh the activities list
      } else {
        const error = await response.json();
        alert(`Error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error cleaning up activities:', error);
      alert('Error cleaning up activities');
    } finally {
      setIsCleaning(false);
    }
  };

  const getActivityIcon = (type, action) => {
    const iconClass = "h-5 w-5";
    
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
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'event':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'mentor':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'country':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'media':
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'system':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
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

  if (loading && activities.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Activity Log</h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Activity Log</h1>
          <p className="text-gray-600">Track all system activities and changes</p>
        </div>
       
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filters:</span>
          </div>
          
          <select
            value={filters.type}
            onChange={(e) => {
              setFilters(prev => ({ ...prev, type: e.target.value }));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Types</option>
            <option value="user">Users</option>
            <option value="event">Events</option>
            <option value="mentor">Mentors</option>
            <option value="country">Countries</option>
            <option value="media">Media</option>
            <option value="system">System</option>
          </select>

          <select
            value={filters.action}
            onChange={(e) => {
              setFilters(prev => ({ ...prev, action: e.target.value }));
              setCurrentPage(1);
            }}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Actions</option>
            <option value="created">Created</option>
            <option value="updated">Updated</option>
            <option value="deleted">Deleted</option>
            <option value="reordered">Reordered</option>
            <option value="login">Login</option>
            <option value="logout">Logout</option>
            <option value="role_changed">Role Changed</option>
            <option value="password_changed">Password Changed</option>
          </select>

          <button
            onClick={resetFilters}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Clear Filters
          </button>
        </div>

        <div className="mt-4 text-sm text-gray-600">
          Showing {activities.length} of {total} activities
        </div>
      </div>

      {/* Activities Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {activities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Changes
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    IP Address
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activities.map((activity, index) => (
                  <tr key={activity._id || index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          {getActivityIcon(activity.type, activity.action)}
                        </div>
                        <div className="ml-3">
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full border ${getActivityColor(activity.type)}`}>
                            {activity.type}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {activity.userName}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 capitalize">
                        {activity.action.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={activity.description}>
                        {activity.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {activity.changes && Object.keys(activity.changes).length > 0 ? (
                        <div className="text-xs text-gray-600 max-w-xs">
                          <div className="font-medium text-gray-700 mb-1">Changes:</div>
                          <div className="space-y-1">
                            {Object.entries(activity.changes).slice(0, 2).map(([key, change]) => (
                              <div key={key} className="truncate">
                                <span className="font-medium">{key}:</span>
                                <span className="text-red-600 line-through ml-1">{JSON.stringify(change.from)}</span>
                                <span className="mx-1">→</span>
                                <span className="text-green-600">{JSON.stringify(change.to)}</span>
                              </div>
                            ))}
                            {Object.keys(activity.changes).length > 2 && (
                              <div className="text-gray-500">+{Object.keys(activity.changes).length - 2} more</div>
                            )}
                          </div>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No changes</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatTimeAgo(activity.createdAt)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {formatDateTime(activity.createdAt)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {activity.ipAddress || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
            <p className="text-gray-500">
              {filters.type !== 'all' || filters.action !== 'all' 
                ? 'Try adjusting your filters' 
                : 'Activities will appear here as you use the system'
              }
            </p>
          </div>
        )}

        {/* Pagination */}
        {total > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(total / filters.limit)}
            onPageChange={handlePageChange}
            totalItems={total}
            itemsPerPage={filters.limit}
          />
        )}
      </div>

      {/* Cleanup Confirmation Modal */}
      <ConfirmationModal
        isOpen={showCleanupModal}
        onClose={() => setShowCleanupModal(false)}
        onConfirm={confirmCleanup}
        title="Cleanup Old Activities"
        message={
          cleanupStats ? 
            `Are you sure you want to delete ${cleanupStats.oldActivities} activities older than 2 months? This action cannot be undone.` :
            'Are you sure you want to cleanup old activities? This will delete activities older than 2 months.'
        }
        confirmText="Delete Old Activities"
        cancelText="Cancel"
        type="danger"
        isLoading={isCleaning}
      />
    </div>
  );
}
