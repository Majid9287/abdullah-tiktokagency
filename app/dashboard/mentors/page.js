'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { Plus, Edit, Trash2, Upload, X, Search, UserX, GripVertical, ArrowUp, ArrowDown } from 'lucide-react';
import Image from 'next/image';
import ConfirmationModal from '@/components/ConfirmationModal';

export default function MentorsPage() {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMentor, setEditingMentor] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    image: '',
    socialLinks: {
      instagram: '',
      tiktok: '',
      youtube: '',
      twitter: '',
    },
    availability: [],
  });
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);

  // Drag and drop state for reordering
  const [draggedMentor, setDraggedMentor] = useState(null);
  const [dragOverMentor, setDragOverMentor] = useState(null);
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);

  // File input ref
  const fileInputRef = useRef(null);

  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Delete confirmation state
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [mentorToDelete, setMentorToDelete] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchMentors = useCallback(async () => {
    try {
      const params = new URLSearchParams({
        search: searchTerm,
      });

      const response = await fetch(`/api/mentors?${params}`);
      const data = await response.json();

      if (response.ok) {
        setMentors(data.mentors || []);
      } else {
        setMentors([]);
      }
    } catch (error) {
      console.error('Error fetching mentors:', error);
      setMentors([]);
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    fetchMentors();
  }, [fetchMentors]);

  const handleImageUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      alert('File size must be less than 10MB');
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return prev + 10;
      });
    }, 200);

    try {
      // Use the upload API route instead of direct Cloudinary calls
      const formDataUpload = new FormData();
      formDataUpload.append('file', file);
      formDataUpload.append('folder', 'mentors');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataUpload,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();

      if (data.success && data.url) {
        setFormData(prev => ({ ...prev, image: data.url }));
        setTimeout(() => setUploadProgress(0), 1000); // Hide progress after success
      } else {
        throw new Error('Invalid response from upload service');
      }
    } catch (error) {
      clearInterval(progressInterval);
      setUploadProgress(0);
      console.error('Error uploading image:', error);
      alert(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
      // Clear the file input to allow re-uploading the same file
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // Drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleImageUpload(files[0]);
    }
  }, []);

  // Drag and drop handlers for reordering
  const handleDragStart = (e, mentor) => {
    // Only allow dragging from grip icon
    if (!e.target.closest('.grip-handle')) {
      e.preventDefault();
      return;
    }
    setDraggedMentor(mentor);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleMentorDragOver = (e, mentor) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverMentor(mentor);
  };

  const handleDragEnd = () => {
    setDraggedMentor(null);
    setDragOverMentor(null);
  };

  const handleDropMentor = async (e, targetMentor) => {
    e.preventDefault();
    setDraggedMentor(null);
    setDragOverMentor(null);

    if (!draggedMentor || draggedMentor._id === targetMentor._id) return;

    try {
      // Update order in database
      const response = await fetch('/api/mentors/reorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          draggedId: draggedMentor._id,
          targetId: targetMentor._id,
        }),
      });

      if (response.ok) {
        fetchMentors(); // Refresh the list
      } else {
        alert('Failed to reorder mentors');
      }
    } catch (error) {
      console.error('Error reordering mentors:', error);
      alert('Error reordering mentors');
    }
  };

  // Handle row click to open details modal
  const handleRowClick = (mentor) => {
    setSelectedMentor(mentor);
    setShowMentorModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const url = editingMentor ? `/api/mentors/${editingMentor._id}` : '/api/mentors';
      const method = editingMentor ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        fetchMentors();
        setShowModal(false);
        resetForm();
      } else {
        alert('Error saving mentor');
      }
    } catch (error) {
      console.error('Error saving mentor:', error);
      alert('Error saving mentor');
    }
  };

  const handleDelete = (id) => {
    const mentor = mentors.find(m => m._id === id);
    setMentorToDelete(mentor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!mentorToDelete) return;

    try {
      setIsDeleting(true);
      const response = await fetch(`/api/mentors/${mentorToDelete._id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchMentors();
        setShowDeleteModal(false);
        setMentorToDelete(null);
      } else {
        alert('Error deleting mentor');
      }
    } catch (error) {
      console.error('Error deleting mentor:', error);
      alert('Error deleting mentor');
    } finally {
      setIsDeleting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      title: '',
      bio: '',
      image: '',
      socialLinks: {
        instagram: '',
        tiktok: '',
        youtube: '',
        twitter: '',
      },
      availability: [],
    });
    setEditingMentor(null);
    setUploadProgress(0);
    setIsDragOver(false);
    setDraggedMentor(null);
    setDragOverMentor(null);
    // Clear the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const openModal = (mentor = null) => {
    if (mentor) {
      setEditingMentor(mentor);
      setFormData({
        name: mentor.name || '',
        title: mentor.title || '',
        bio: mentor.bio || '',
        image: mentor.image || '',
        order: mentor.order || 0,
        socialLinks: mentor.socialLinks || {
          instagram: '',
          tiktok: '',
          youtube: '',
          twitter: '',
        },
        availability: mentor.availability || [],
      });
    } else {
      resetForm();
    }
    setShowModal(true);
    setIsDragOver(false);
    setDraggedMentor(null);
    setDragOverMentor(null);
  };

  // Availability management functions
  const addAvailabilitySlot = () => {
    setFormData(prev => ({
      ...prev,
      availability: [...prev.availability, { day: 'monday', timeRange: '9 am–5 pm', isActive: true }]
    }));
  };

  const removeAvailabilitySlot = (index) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.filter((_, i) => i !== index)
    }));
  };

  const updateAvailabilitySlot = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      availability: prev.availability.map((slot, i) =>
        i === index ? { ...slot, [field]: value } : slot
      )
    }));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mentors Management</h1>
          <p className="text-gray-600 mt-1">Manage team members working with us for TikTok Live</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          Add Mentor
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search mentors by name or title..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Results Summary */}
      <div className="flex justify-between items-center text-sm text-gray-600">
        <div>
          Showing {mentors.length} mentors
        </div>
        {searchTerm && (
          <div className="flex items-center gap-2">
            <span>Search results for: &quot;{searchTerm}&quot;</span>
            <button
              onClick={() => {
                setSearchTerm('');
              }}
              className="text-blue-600 hover:text-blue-800 text-xs"
            >
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {/* Drag and Drop Instructions */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <GripVertical className="h-5 w-5 text-blue-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Drag & Drop:</strong> Click and drag any row by the grip icon to reorder mentors. The order will be saved automatically.
              </p>
            </div>
          </div>
        </div>

        {mentors.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Mentor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Bio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Availability
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mentors.map((mentor) => (
                  <tr
                    key={mentor._id}
                    onClick={() => handleRowClick(mentor)}
                    onDragOver={(e) => handleMentorDragOver(e, mentor)}
                    onDrop={(e) => handleDropMentor(e, mentor)}
                    className={`hover:bg-gray-50 cursor-pointer ${
                      draggedMentor?._id === mentor._id ? 'opacity-50' : ''
                    } ${
                      dragOverMentor?._id === mentor._id ? 'bg-blue-50 border-blue-200' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center">
                        <div
                          className="grip-handle cursor-move p-1 hover:bg-gray-200 rounded"
                          draggable
                          onDragStart={(e) => handleDragStart(e, mentor)}
                          onDragEnd={handleDragEnd}
                        >
                          <GripVertical className="h-4 w-4 text-gray-400" />
                        </div>
                        <span className="text-sm text-gray-900 ml-2">{mentor.order || 0}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <Image
                            className="h-10 w-10 rounded-full object-cover"
                            src={mentor.image || '/placeholder-user.jpg'}
                            alt={mentor.name}
                            width={40}
                            height={40}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{mentor.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate">{mentor.bio}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {mentor.availability && mentor.availability.length > 0 ? (
                          <div className="space-y-1">
                            {mentor.availability.filter(slot => slot.isActive).slice(0, 2).map((slot, index) => (
                              <div key={index} className="text-xs">
                                <span className="capitalize">{slot.day}:</span> {slot.timeRange}
                              </div>
                            ))}
                            {mentor.availability.filter(slot => slot.isActive).length > 2 && (
                              <div className="text-xs text-gray-400">
                                +{mentor.availability.filter(slot => slot.isActive).length - 2} more
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400 italic">No availability</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openModal(mentor)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded"
                          title="Edit mentor"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(mentor._id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Delete mentor"
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
            <UserX className="h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No mentors found</h3>
            <p className="text-gray-500">
              {searchTerm
                ? 'Try adjusting your search term'
                : 'Get started by adding your first mentor'
              }
            </p>
          </div>
        )}
      </div>


      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingMentor ? 'Edit Mentor' : 'Add New Mentor'}
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className={`grid grid-cols-1 md:grid-cols-${editingMentor ? '3' : '2'} gap-6`}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                  {editingMentor && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                      <input
                        type="number"
                        min="0"
                        value={formData.order || 0}
                        onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 0 }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="space-y-4">
                    {/* Image Preview */}
                    {formData.image ? (
                      <div className="relative">
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div
                            className="relative h-32 w-32 mx-auto rounded-lg overflow-hidden border-2 border-gray-200 cursor-pointer group"
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                          >
                            <Image
                              src={formData.image}
                              alt="Profile Preview"
                              fill
                              className="object-cover"
                            />
                            <div className={`absolute inset-0 bg-black transition-all duration-200 flex items-center justify-center ${
                              isDragOver ? 'bg-opacity-50' : 'bg-opacity-0 group-hover:bg-opacity-30'
                            }`}>
                              {isDragOver ? (
                                <div className="text-white text-center">
                                  <Upload className="h-8 w-8 mx-auto mb-1" />
                                  <span className="text-xs">Drop to replace</span>
                                </div>
                              ) : (
                                <Upload className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              )}
                            </div>
                            {uploading && (
                              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                                <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent"></div>
                              </div>
                            )}
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setFormData(prev => ({ ...prev, image: '' }));
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors opacity-0 group-hover:opacity-100"
                              title="Remove image"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </label>
                        <p className="text-xs text-gray-500 text-center mt-2">
                          {isDragOver ? 'Drop to replace image' : 'Click to change or drag & drop new image'}
                        </p>
                      </div>
                    ) : (
                      <div
                        className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                          isDragOver
                            ? 'border-blue-400 bg-blue-50'
                            : 'border-gray-300 hover:border-blue-400'
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                      >
                        <Upload className={`mx-auto h-12 w-12 ${isDragOver ? 'text-blue-500' : 'text-gray-400'}`} />
                        <div className="mt-4">
                          <label
                            htmlFor="image-upload"
                            className="cursor-pointer"
                          >
                            <span className="mt-2 block text-sm font-medium text-gray-900">
                              {uploading ? 'Uploading...' : isDragOver ? 'Drop image here' : 'Upload profile image'}
                            </span>
                            <span className="mt-1 block text-sm text-gray-500">
                              {isDragOver ? 'Release to upload' : 'PNG, JPG, GIF up to 10MB or drag & drop'}
                            </span>
                          </label>
                        </div>
                      </div>
                    )}

                    {/* Upload Input */}
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e.target.files[0])}
                      className="hidden"
                      id="image-upload"
                    />

                    {/* Upload Progress */}
                    {uploading && (
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${uploadProgress}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                    <input
                      type="url"
                      value={formData.socialLinks.instagram}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">TikTok</label>
                    <input
                      type="url"
                      value={formData.socialLinks.tiktok}
                      onChange={(e) => setFormData(prev => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, tiktok: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className="block text-sm font-medium text-gray-700">Availability Schedule</label>
                    <button
                      type="button"
                      onClick={addAvailabilitySlot}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center gap-1"
                    >
                      <Plus size={16} />
                      Add Time Slot
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.availability.map((slot, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-1">
                          <select
                            value={slot.day}
                            onChange={(e) => updateAvailabilitySlot(index, 'day', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          >
                            <option value="monday">Monday</option>
                            <option value="tuesday">Tuesday</option>
                            <option value="wednesday">Wednesday</option>
                            <option value="thursday">Thursday</option>
                            <option value="friday">Friday</option>
                            <option value="saturday">Saturday</option>
                            <option value="sunday">Sunday</option>
                          </select>
                        </div>

                        <div className="flex-1">
                          <input
                            type="text"
                            value={slot.timeRange}
                            onChange={(e) => updateAvailabilitySlot(index, 'timeRange', e.target.value)}
                            placeholder="e.g., 9 am–5 pm"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <label className="flex items-center gap-1 text-sm">
                            <input
                              type="checkbox"
                              checked={slot.isActive}
                              onChange={(e) => updateAvailabilitySlot(index, 'isActive', e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            Active
                          </label>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeAvailabilitySlot(index)}
                          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                          title="Remove this time slot"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}

                    {formData.availability.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <p className="text-sm">No availability slots added yet.</p>
                        <p className="text-xs mt-1">Click &quot;Add Time Slot&quot; to get started.</p>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-gray-500 mt-2">
                    Add multiple time slots for different days. Use formats like &quot;9 am–5 pm&quot; or &quot;1–11 pm&quot;.
                  </p>
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    {editingMentor ? 'Update Mentor' : 'Add Mentor'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Mentor Details Modal */}
      {showMentorModal && selectedMentor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Mentor Details</h2>
                <button
                  onClick={() => setShowMentorModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-6">
                {/* Profile Image and Basic Info */}
                <div className="flex items-start gap-6">
                  <div className="relative h-24 w-24 rounded-lg overflow-hidden bg-gray-200">
                    <Image
                      src={selectedMentor.image || '/placeholder-user.jpg'}
                      alt={selectedMentor.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900">{selectedMentor.name}</h3>
                    <p className="text-lg text-gray-600">{selectedMentor.title}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        selectedMentor.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedMentor.isActive ? 'Active' : 'Inactive'}
                      </span>
                      <span className="text-sm text-gray-500">Order: {selectedMentor.order || 0}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">Bio</h4>
                  <p className="text-gray-600">{selectedMentor.bio}</p>
                </div>

                {/* Social Links */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Social Links</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {selectedMentor.socialLinks?.instagram && (
                      <a
                        href={selectedMentor.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-pink-600 hover:text-pink-700"
                      >
                        Instagram: {selectedMentor.socialLinks.instagram}
                      </a>
                    )}
                    {selectedMentor.socialLinks?.tiktok && (
                      <a
                        href={selectedMentor.socialLinks.tiktok}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-black hover:text-gray-700"
                      >
                        TikTok: {selectedMentor.socialLinks.tiktok}
                      </a>
                    )}
                    {selectedMentor.socialLinks?.youtube && (
                      <a
                        href={selectedMentor.socialLinks.youtube}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-red-600 hover:text-red-700"
                      >
                        YouTube: {selectedMentor.socialLinks.youtube}
                      </a>
                    )}
                    {selectedMentor.socialLinks?.twitter && (
                      <a
                        href={selectedMentor.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                      >
                        Twitter: {selectedMentor.socialLinks.twitter}
                      </a>
                    )}
                  </div>
                </div>

                {/* Availability Schedule */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-3">Availability Schedule</h4>
                  {selectedMentor.availability && selectedMentor.availability.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {selectedMentor.availability.filter(slot => slot.isActive).map((slot, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium capitalize">{slot.day}</span>
                          <span className="text-gray-600">{slot.timeRange}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No availability schedule set</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4 border-t">
                  <button
                    onClick={() => {
                      setShowMentorModal(false);
                      openModal(selectedMentor);
                    }}
                    className="px-4 py-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg"
                  >
                    Edit Mentor
                  </button>
                  <button
                    onClick={() => setShowMentorModal(false)}
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
          setMentorToDelete(null);
        }}
        onConfirm={confirmDelete}
        title="Delete Mentor"
        message={`Are you sure you want to delete "${mentorToDelete?.name}"? This action cannot be undone and will permanently remove the mentor from the system.`}
        confirmText="Delete Mentor"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  );
}
