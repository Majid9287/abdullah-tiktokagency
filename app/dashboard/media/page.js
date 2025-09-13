"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Upload, ImageIcon, Film, Trash, Search, Filter, Plus, Edit, Play } from "lucide-react"

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [showVideoModal, setShowVideoModal] = useState(false)
  const [showImageModal, setShowImageModal] = useState(false)
  const [editingVideo, setEditingVideo] = useState(null)
  const [editingImage, setEditingImage] = useState(null)
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    platform: "youtube",
    thumbnail: "",
    isActive: true
  })
  const [imageForm, setImageForm] = useState({
    title: "",
    description: "",
    imageUrl: "",
    isActive: true
  })

  useEffect(() => {
    fetchMedia()
  }, [])

  const fetchMedia = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setMediaItems(data)
      }
    } catch (error) {
      console.error('Error fetching media:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this video?')) return

    try {
      const response = await fetch(`/api/events/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        setMediaItems(mediaItems.filter(item => item._id !== id))
      }
    } catch (error) {
      console.error('Error deleting video:', error)
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()

    try {
      const url = editingVideo ? `/api/events/${editingVideo._id}` : '/api/events'
      const method = editingVideo ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoForm)
      })

      if (response.ok) {
        const data = await response.json()
        if (editingVideo) {
          setMediaItems(mediaItems.map(item => item._id === editingVideo._id ? data : item))
        } else {
          setMediaItems([data, ...mediaItems])
        }
        setShowVideoModal(false)
        setEditingVideo(null)
        setVideoForm({
          title: "",
          description: "",
          videoUrl: "",
          platform: "youtube",
          thumbnail: "",
          isActive: true
        })
      }
    } catch (error) {
      console.error('Error saving video:', error)
    }
  }

  const openVideoModal = (video = null) => {
    if (video) {
      setEditingVideo(video)
      setVideoForm({
        title: video.title,
        description: video.description,
        videoUrl: video.videoUrl,
        platform: video.platform,
        thumbnail: video.thumbnail,
        isActive: video.isActive
      })
    } else {
      setEditingVideo(null)
      setVideoForm({
        title: "",
        description: "",
        videoUrl: "",
        platform: "youtube",
        thumbnail: "",
        isActive: true
      })
    }
    setShowVideoModal(true)
  }

  const openImageModal = (image = null) => {
    if (image) {
      setEditingImage(image)
      setImageForm({
        title: image.title,
        description: image.description,
        imageUrl: image.imageUrl,
        isActive: image.isActive
      })
    } else {
      setEditingImage(null)
      setImageForm({
        title: "",
        description: "",
        imageUrl: "",
        isActive: true
      })
    }
    setShowImageModal(true)
  }

  const handleImageSubmit = async (e) => {
    e.preventDefault()

    try {
      // For now, we'll just show an alert since we don't have an images API yet
      alert('Image upload functionality will be implemented with Cloudinary integration')
      setShowImageModal(false)
      setImageForm({
        title: "",
        description: "",
        imageUrl: "",
        isActive: true
      })
    } catch (error) {
      console.error('Error saving image:', error)
    }
  }

  const getVideoThumbnail = (videoUrl, platform, customThumbnail) => {
    if (customThumbnail) return customThumbnail
    if (!videoUrl) return '/event.png'

    if (platform === 'youtube') {
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/event.png'
    } else if (platform === 'tiktok') {
      return '/event.png'
    }

    return '/event.png'
  }

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Media Library</h1>
        <div className="flex gap-4">
          <Link href="/dashboard/media/upload" className="btn-secondary flex items-center">
            <Upload className="h-4 w-4 mr-1" />
            Upload Media
          </Link>
          <button onClick={() => openVideoModal()} className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Video
          </button>
          <button onClick={() => openImageModal()} className="btn-secondary flex items-center">
            <ImageIcon className="h-4 w-4 mr-1" />
            Add Image
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search media..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Video Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item._id} className="bg-white rounded-lg shadow overflow-hidden group hover:shadow-xl transition-shadow">
            <div className="relative h-48 w-full">
              <Image
                src={getVideoThumbnail(item.videoUrl, item.platform, item.thumbnail) || "/event.png"}
                alt={item.title}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <div className="flex gap-2">
                  <a
                    href={item.videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Play className="h-5 w-5" />
                  </a>
                  <button
                    onClick={() => openVideoModal(item)}
                    className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-600/80 backdrop-blur-sm rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
              {/* Platform Badge */}
              <div className="absolute top-2 left-2">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                  item.platform === 'youtube' ? 'bg-red-600 text-white' :
                  item.platform === 'tiktok' ? 'bg-black text-white' :
                  'bg-gray-600 text-white'
                }`}>
                  {item.platform}
                </span>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 truncate mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{item.description}</p>
              <div className="flex justify-between items-center text-xs text-gray-500">
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full ${item.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {item.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="flex justify-center mb-4">
            <Film className="h-16 w-16 text-gray-300" />
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No media found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or add your first video/image</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => openVideoModal()} className="btn-primary">
              Add Video
            </button>
            <button onClick={() => openImageModal()} className="btn-secondary">
              Add Image
            </button>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {showVideoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingVideo ? 'Edit Video' : 'Add New Video'}
            </h2>
            <form onSubmit={handleVideoSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="3"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Video URL</label>
                <input
                  type="url"
                  value={videoForm.videoUrl}
                  onChange={(e) => setVideoForm({...videoForm, videoUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform</label>
                <select
                  value={videoForm.platform}
                  onChange={(e) => setVideoForm({...videoForm, platform: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                >
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Thumbnail URL (optional)</label>
                <input
                  type="url"
                  value={videoForm.thumbnail}
                  onChange={(e) => setVideoForm({...videoForm, thumbnail: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={videoForm.isActive}
                  onChange={(e) => setVideoForm({...videoForm, isActive: e.target.checked})}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">
                  Active
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowVideoModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingVideo ? 'Update' : 'Add'} Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4">
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
            <form onSubmit={handleImageSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image Title</label>
                <input
                  type="text"
                  value={imageForm.title}
                  onChange={(e) => setImageForm({...imageForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Team Photo 2024"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={imageForm.description}
                  onChange={(e) => setImageForm({...imageForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="3"
                  placeholder="Describe this image..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  value={imageForm.imageUrl}
                  onChange={(e) => setImageForm({...imageForm, imageUrl: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="https://example.com/image.jpg"
                  required
                />
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={imageForm.isActive}
                    onChange={(e) => setImageForm({...imageForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">Make this image active (visible in gallery)</span>
                </label>
              </div>
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  {editingImage ? 'Update' : 'Add'} Image
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

