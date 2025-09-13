"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import ConfirmationModal from "@/components/ConfirmationModal"
import { Plus, Edit, Trash2, Search, Calendar, Play, ExternalLink, ImageIcon, Filter, GripVertical, X } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [showAll, setShowAll] = useState(false)

  // Drag and drop state for reordering
  const [draggedEvent, setDraggedEvent] = useState(null)
  const [dragOverEvent, setDragOverEvent] = useState(null)
  const [showEventModal, setShowEventModal] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  
  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [eventToDelete, setEventToDelete] = useState(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        type: typeFilter,
        showAll: showAll.toString()
      })

      const response = await fetch(`/api/events?${params}`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events)
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, typeFilter, showAll])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  // Drag and drop handlers for reordering
  const handleDragStart = (e, event) => {
    // Only allow dragging from grip icon
    if (!e.target.closest('.grip-handle')) {
      e.preventDefault();
      return;
    }
    setDraggedEvent(event)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e, event) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    setDragOverEvent(event)
  }

  const handleDragEnd = () => {
    setDraggedEvent(null)
    setDragOverEvent(null)
  }

  const handleDropEvent = async (e, targetEvent) => {
    e.preventDefault()
    setDraggedEvent(null)
    setDragOverEvent(null)

    if (!draggedEvent || draggedEvent._id === targetEvent._id) return

    try {
      // Update order in database
      const response = await fetch('/api/events/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draggedId: draggedEvent._id,
          targetId: targetEvent._id,
        }),
      })

      if (response.ok) {
        fetchEvents() // Refresh the list
      } else {
        alert('Failed to reorder events')
      }
    } catch (error) {
      console.error('Error reordering events:', error)
      alert('Error reordering events')
    }
  }

  // Handle row click to open details modal
  const handleRowClick = (event) => {
    setSelectedEvent(event)
    setShowEventModal(true)
  }

  const handleDelete = (id) => {
    const event = events.find(e => e._id === id)
    setEventToDelete(event)
    setShowDeleteModal(true)
  }

  const confirmDelete = async () => {
    if (!eventToDelete) return

    try {
      setIsDeleting(true)
      const response = await fetch(`/api/events/${eventToDelete._id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchEvents()
        setShowDeleteModal(false)
        setEventToDelete(null)
      } else {
        alert('Error deleting event')
      }
    } catch (error) {
      console.error("Error deleting event:", error)
      alert('Error deleting event')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = (event) => {
    // Navigate to edit page or open edit modal
    window.location.href = `/dashboard/events/${event._id}/edit`
  }

  const getThumbnailUrl = (event) => {
    if (event.type === 'image') {
      return event.imageUrl || "/placeholder.svg"
    }

    if (!event.videoUrl) return "/placeholder.svg"

    if (event.platform === "youtube") {
      const videoId = event.videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : "/placeholder.svg"
    } else if (event.platform === "tiktok") {
      // TikTok doesn't provide easy thumbnail access, so we'll use a placeholder
      return "/placeholder.svg"
    }

    return "/placeholder.svg"
  }

  const filteredEvents = events.filter(event =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Events & Memories</h1>
          <p className="text-gray-600">Manage your video content and event memories</p>
        </div>
        <Link
          href="/dashboard/events/create"
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>Add Event</span>
        </Link>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search events by title or description..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value)
              }}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value)
              }}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="video">Videos</option>
              <option value="image">Images</option>
            </select>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showAll}
                onChange={(e) => {
                  setShowAll(e.target.checked)
                }}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-700">Show Inactive</span>
            </label>
          </div>
        </div>
      </div>

      {/* Events Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Drag and Drop Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <GripVertical className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Drag & Drop:</strong> Click and drag any row by the grip icon to reorder events. The order will be saved automatically.
              </p>
            </div>
          </div>
        </div>

        {events.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Platform
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {events.map((event) => (
                  <tr
                    key={event._id}
                    onClick={() => handleRowClick(event)}
                    onDragOver={(e) => handleDragOver(e, event)}
                    onDrop={(e) => handleDropEvent(e, event)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      draggedEvent?._id === event._id ? 'opacity-50' : ''
                    } ${
                      dragOverEvent?._id === event._id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center">
                        <div
                          className="grip-handle cursor-move p-1 hover:bg-gray-200 rounded"
                          draggable
                          onDragStart={(e) => handleDragStart(e, event)}
                          onDragEnd={handleDragEnd}
                        >
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-900 ml-2">{event.order || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-200">
                        <Image
                          src={getThumbnailUrl(event)}
                          alt={event.title}
                          fill
                          className="object-cover"
                          onError={(e) => {
                            e.target.src = "/placeholder.svg"
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500 truncate">
                          {event.description}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        event.type === 'video'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {event.type === 'video' ? 'Video' : 'Image'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {event.type === 'video' && event.platform ? (
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          event.platform === 'youtube'
                            ? 'bg-red-100 text-red-800'
                            : event.platform === 'tiktok'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {event.platform.charAt(0).toUpperCase() + event.platform.slice(1)}
                        </span>
                      ) : (
                        <span className="text-sm text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        event.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {event.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        {(event.videoUrl || event.imageUrl) && (
                          <button
                            onClick={() => window.open(event.videoUrl || event.imageUrl, '_blank')}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View content"
                          >
                            <ExternalLink size={16} />
                          </button>
                        )}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(event);
                          }}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Edit event"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(event._id);
                          }}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete event"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12">
            <ImageIcon className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search term'
                : 'Get started by adding your first event'
              }
            </p>
          </div>
        )}
      </div>


      {/* Empty State */}
      {events.length === 0 && !loading && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
          <p className="text-gray-600">
            {searchTerm ? "Try adjusting your search terms." : "Get started by adding your first event."}
          </p>
        </div>
      )}

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Event Details</h2>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Thumbnail and Basic Info */}
                <div className="flex items-start gap-6">
                  <div className="relative h-32 w-32 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={getThumbnailUrl(selectedEvent)}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder.svg"
                      }}
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        selectedEvent.type === 'video'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedEvent.type === 'video' ? 'Video' : 'Image'}
                      </span>
                      {selectedEvent.type === 'video' && selectedEvent.platform && (
                        <span className={`px-2 py-1 text-xs font-medium rounded ${
                          selectedEvent.platform === 'youtube'
                            ? 'bg-red-100 text-red-800'
                            : selectedEvent.platform === 'tiktok'
                            ? 'bg-black text-white'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {selectedEvent.platform.charAt(0).toUpperCase() + selectedEvent.platform.slice(1)}
                        </span>
                      )}
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        selectedEvent.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedEvent.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-sm text-gray-500">Order: {selectedEvent.order || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Description</h4>
                  <p className="text-gray-600">{selectedEvent.description}</p>
                </div>

                {/* Links */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Links</h4>
                  <div className="space-y-2">
                    {selectedEvent.videoUrl && (
                      <a
                        href={selectedEvent.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink size={16} />
                        View {selectedEvent.type === 'video' ? 'Video' : 'Image'}
                      </a>
                    )}
                    {selectedEvent.imageUrl && selectedEvent.type === 'image' && (
                      <a
                        href={selectedEvent.imageUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        <ExternalLink size={16} />
                        View Image
                      </a>
                    )}
                  </div>
                </div>

                {/* Metadata */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Created</h4>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedEvent.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-500">Last Updated</h4>
                    <p className="text-sm text-gray-900">
                      {new Date(selectedEvent.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowEventModal(false);
                      handleEdit(selectedEvent);
                    }}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                  >
                    Edit Event
                  </button>
                  <button
                    onClick={() => setShowEventModal(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setEventToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Event"
        message={`Are you sure you want to delete "${eventToDelete?.title}"? This action cannot be undone and will permanently remove the event from the system.`}
        confirmText="Delete Event"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}
