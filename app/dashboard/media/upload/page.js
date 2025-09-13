"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, X, Check, Film } from "lucide-react"

export default function UploadMediaPage() {
  const router = useRouter()
  const fileInputRef = useRef(null)
  const thumbnailInputRef = useRef(null)

  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})
  const [videoForm, setVideoForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
    platform: "youtube",
    thumbnail: "",
    isActive: true
  })
  const [uploadType, setUploadType] = useState('video') // 'image' or 'video'

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files)

    const newFiles = selectedFiles.map((file) => ({
      id: Date.now() + Math.random().toString(36).substring(2, 9),
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      type: file.type.startsWith("image/") ? "image" : "video",
      size: file.size,
      progress: 0,
      uploaded: false,
      error: null,
    }))

    setFiles([...files, ...newFiles])
  }

  const removeFile = (id) => {
    const fileToRemove = files.find((file) => file.id === id)
    if (fileToRemove && fileToRemove.preview) {
      URL.revokeObjectURL(fileToRemove.preview)
    }

    setFiles(files.filter((file) => file.id !== id))
  }

  const handleThumbnailUpload = async (file) => {
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', 'thumbnails')

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Thumbnail upload failed')
      }

      const data = await response.json()
      setVideoForm({...videoForm, thumbnail: data.url})
      return data.url
    } catch (error) {
      console.error('Error uploading thumbnail:', error)
      return null
    }
  }

  const handleVideoSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(videoForm)
      })

      if (response.ok) {
        router.push('/dashboard/media')
      }
    } catch (error) {
      console.error('Error creating video:', error)
    }
  }

  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0]
    if (file) {
      await handleThumbnailUpload(file)
    }
  }

  const uploadFiles = async () => {
    if (files.length === 0 || uploading) return

    setUploading(true)

    // Upload files via API route
    const uploadPromises = files.map(async (file) => {
      try {
        const formData = new FormData()
        formData.append('file', file.file)
        formData.append('folder', 'uploads')

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        })

        if (!response.ok) {
          throw new Error('Upload failed')
        }

        const data = await response.json()

        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, uploaded: true, cloudinaryUrl: data.url } : f)),
        )

        return { success: true, fileId: file.id }
      } catch (error) {
        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, error: error.message || "Upload failed" } : f)),
        )

        return { success: false, fileId: file.id, error }
      }
    })

    await Promise.all(uploadPromises)
    setUploading(false)
  }

  const allUploaded = files.length > 0 && files.every((file) => file.uploaded)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Upload Media</h1>
      </div>

      {/* Upload Type Selection */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">What would you like to upload?</h2>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="image"
              checked={uploadType === 'image'}
              onChange={(e) => setUploadType(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">Image/Photo</span>
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="video"
              checked={uploadType === 'video'}
              onChange={(e) => setUploadType(e.target.value)}
              className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300"
            />
            <span className="ml-2 text-sm font-medium text-gray-900">Video (Event)</span>
          </label>
        </div>
      </div>

      {/* Video Upload Form */}
      {uploadType === 'video' && (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Add Video Event</h2>
          <form onSubmit={handleVideoSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Title</label>
                <input
                  type="text"
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({...videoForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="e.g., Creator Summit 2024"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Description</label>
                <textarea
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({...videoForm, description: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  rows="3"
                  placeholder="Describe the event and what viewers will learn..."
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Custom Thumbnail (optional)</label>
                <div className="flex gap-4">
                  <input
                    type="url"
                    value={videoForm.thumbnail}
                    onChange={(e) => setVideoForm({...videoForm, thumbnail: e.target.value})}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">or</span>
                    <input
                      type="file"
                      ref={thumbnailInputRef}
                      onChange={handleThumbnailChange}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                    >
                      Upload Image
                    </button>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={videoForm.isActive}
                    onChange={(e) => setVideoForm({...videoForm, isActive: e.target.checked})}
                    className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-900">Make this event active (visible on homepage)</span>
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn-primary">
                Add Event Video
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Image Upload Area */}
      {uploadType === 'image' && (
        <div className="space-y-6">
          {/* Upload Area */}
          <div
            className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-pink-500 transition-colors cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept="image/*"
              className="hidden"
            />

            <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-1">Drag and drop or click to upload images</h3>
            <p className="text-gray-500 mb-4">Support for JPG, PNG, GIF images</p>
            <button className="btn-primary">Select Images</button>
          </div>

          {/* File List */}
          {files.length > 0 && (
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <h2 className="font-medium text-gray-800">Selected Images ({files.length})</h2>
              </div>

              <ul className="divide-y divide-gray-200">
                {files.map((file) => (
                  <li key={file.id} className="p-4 flex items-center">
                    <div className="h-16 w-16 relative rounded overflow-hidden mr-4 flex-shrink-0">
                      <Image src={file.preview || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        Image • {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>

                      {uploading && !file.uploaded && !file.error && (
                        <div className="mt-2">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-pink-600 rounded-full"
                              style={{ width: `${uploadProgress[file.id] || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{uploadProgress[file.id] || 0}% uploaded</p>
                        </div>
                      )}

                      {file.uploaded && (
                        <p className="text-xs text-green-600 flex items-center mt-1">
                          <Check className="h-3 w-3 mr-1" /> Upload complete
                        </p>
                      )}

                      {file.error && <p className="text-xs text-red-600 mt-1">{file.error}</p>}
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        removeFile(file.id)
                      }}
                      className="ml-4 p-1 text-gray-400 hover:text-red-600 rounded-full hover:bg-gray-100"
                      disabled={uploading}
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </li>
                ))}
              </ul>

              <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
                <button onClick={() => setFiles([])} className="text-gray-600 hover:text-gray-800" disabled={uploading}>
                  Clear All
                </button>

                {allUploaded ? (
                  <button onClick={() => router.push("/dashboard/media")} className="btn-primary">
                    Go to Media Library
                  </button>
                ) : (
                  <button onClick={uploadFiles} className="btn-primary" disabled={files.length === 0 || uploading}>
                    {uploading ? "Uploading..." : "Upload Images"}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

