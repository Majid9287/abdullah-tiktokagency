"use client"

import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Upload, X, Check, Film } from "lucide-react"
import { uploadToCloudinary } from "@/lib/cloudinary"

export default function UploadMediaPage() {
  const router = useRouter()
  const fileInputRef = useRef(null)

  const [files, setFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState({})

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

  const uploadFiles = async () => {
    if (files.length === 0 || uploading) return

    setUploading(true)

    // Simulate upload progress for each file
    const uploadPromises = files.map(async (file) => {
      try {
        // Simulate progress updates
        for (let progress = 0; progress <= 100; progress += 10) {
          setUploadProgress((prev) => ({
            ...prev,
            [file.id]: progress,
          }))

          // Add a small delay to simulate upload time
          await new Promise((resolve) => setTimeout(resolve, 300))
        }

        // Simulate Cloudinary upload
        // In a real app, you would use the actual uploadToCloudinary function
        const result = await uploadToCloudinary(file.file)

        setFiles((prevFiles) =>
          prevFiles.map((f) => (f.id === file.id ? { ...f, uploaded: true, cloudinaryUrl: result.secure_url } : f)),
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
          accept="image/*,video/*"
          className="hidden"
        />

        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-800 mb-1">Drag and drop or click to upload</h3>
        <p className="text-gray-500 mb-4">Support for images and videos</p>
        <button className="btn-primary">Select Files</button>
      </div>

      {/* File List */}
      {files.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-4 border-b">
            <h2 className="font-medium text-gray-800">Selected Files ({files.length})</h2>
          </div>

          <ul className="divide-y divide-gray-200">
            {files.map((file) => (
              <li key={file.id} className="p-4 flex items-center">
                <div className="h-16 w-16 relative rounded overflow-hidden mr-4 flex-shrink-0">
                  {file.type === "image" ? (
                    <Image src={file.preview || "/placeholder.svg"} alt={file.name} fill className="object-cover" />
                  ) : (
                    <div className="bg-gray-200 h-full w-full flex items-center justify-center">
                      <Film className="h-8 w-8 text-gray-500" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{file.name}</p>
                  <p className="text-xs text-gray-500">
                    {file.type === "image" ? "Image" : "Video"} • {(file.size / 1024 / 1024).toFixed(2)} MB
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
                {uploading ? "Uploading..." : "Upload Files"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

