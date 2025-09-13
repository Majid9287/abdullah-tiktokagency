"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, Upload, X, Check, ImageIcon, Video, Save } from "lucide-react"
import Link from "next/link"

export default function EditEventPage() {
  const router = useRouter()
  const params = useParams()
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    type: "video",
    videoUrl: "",
    platform: "youtube",
    thumbnail: "",
    imageUrl: "",
    date: "",
    isActive: true,
    order: 0
  })
  const [selectedFile, setSelectedFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)

  // Fetch event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${params.id}`)
        if (response.ok) {
          const event = await response.json()
          setFormData({
            title: event.title || "",
            description: event.description || "",
            type: event.type || "video",
            videoUrl: event.videoUrl || "",
            platform: event.platform || "youtube",
            thumbnail: event.thumbnail || "",
            imageUrl: event.imageUrl || "",
            date: event.date || "",
            isActive: event.isActive !== undefined ? event.isActive : true,
            order: event.order || 0
          })
        } else {
          alert('Event not found')
          router.push('/dashboard/events')
        }
      } catch (error) {
        console.error('Error fetching event:', error)
        alert('Error loading event')
        router.push('/dashboard/events')
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchEvent()
    }
  }, [params.id, router])

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setSelectedFile(file)
    }
  }

  const uploadFile = async (file) => {
    const formDataUpload = new FormData()
    formDataUpload.append('file', file)
    formDataUpload.append('folder', 'events')

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formDataUpload
    })

    if (!response.ok) {
      throw new Error('Upload failed')
    }

    const data = await response.json()
    return data.url
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setUploading(true)

    try {
      let updatedFormData = { ...formData }

      // Upload file if selected
      if (selectedFile) {
        if (formData.type === 'image') {
          updatedFormData.imageUrl = await uploadFile(selectedFile)
        } else {
          updatedFormData.thumbnail = await uploadFile(selectedFile)
        }
      }

      const response = await fetch(`/api/events/${params.id}`, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFormData),
      })

      if (response.ok) {
        router.push('/dashboard/events')
      } else {
        alert('Error updating event')
      }
    } catch (error) {
      console.error("Error updating event:", error)
      alert('Error updating event')
    } finally {
      setUploading(false)
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            href="/dashboard/events"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Events</span>
          </Link>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Edit Event</h1>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event Type *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="video"
                  checked={formData.type === 'video'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <Video className="h-5 w-5 ml-3 text-gray-600" />
                <span className="ml-2 text-sm font-medium text-gray-900">Video Event</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="image"
                  checked={formData.type === 'image'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                />
                <ImageIcon className="h-5 w-5 ml-3 text-gray-600" />
                <span className="ml-2 text-sm font-medium text-gray-900">Image Event</span>
              </label>
            </div>
          </div>

          {/* Title, Date, and Order */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Creator Summit 2024"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Order
              </label>
              <input
                type="number"
                min="0"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                placeholder="0"
              />
              <p className="text-xs text-gray-500 mt-1">Lower numbers appear first</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              rows={4}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the event and what viewers will learn..."
            />
          </div>

          {/* Video-specific fields */}
          {formData.type === 'video' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Platform *
                  </label>
                  <select
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.platform}
                    onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                  >
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Video URL *
                  </label>
                  <input
                    type="url"
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={formData.videoUrl}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>
              </div>
            </div>
          )}

          {/* File Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === 'video' ? 'Custom Thumbnail' : 'Image Upload'}
              {formData.type === 'video' && ' (optional)'}
            </label>
            
            {/* Current Image/Thumbnail Display */}
            {(formData.thumbnail || formData.imageUrl) && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">Current {formData.type === 'video' ? 'thumbnail' : 'image'}:</p>
                <div className="relative h-32 w-32 rounded-lg overflow-hidden bg-gray-200">
                  <Image
                    src={formData.type === 'video' ? formData.thumbnail : formData.imageUrl}
                    alt="Current"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.target.src = "/placeholder.svg"
                    }}
                  />
                </div>
              </div>
            )}

            {selectedFile ? (
              <div className="flex items-center space-x-3 p-4 border border-gray-300 rounded-lg bg-gray-50">
                <Check className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{selectedFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  className="p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-200"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept={formData.type === 'video' ? "image/*" : "image/*"}
                  className="hidden"
                />
                <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-800 mb-1">
                  Click to upload {formData.type === 'video' ? 'thumbnail' : 'image'}
                </h3>
                <p className="text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            )}
          </div>

          {/* Active Status */}
          <div className="flex items-center">
            <input
              type="checkbox"
              id="isActive"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
            />
            <label htmlFor="isActive" className="ml-2 text-sm text-gray-700">
              Make this event active (visible on homepage)
            </label>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link
              href="/dashboard/events"
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting || uploading}
              className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              <span>{submitting ? 'Updating...' : 'Update Event'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
