"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Upload, ImageIcon, Film, Trash, Search, Filter } from "lucide-react"

export default function MediaPage() {
  const [mediaItems, setMediaItems] = useState([
    {
      id: 1,
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      title: "Summer Camp Group Photo",
      uploadedAt: "2023-07-15",
    },
    {
      id: 2,
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      title: "Creator Summit Banner",
      uploadedAt: "2023-08-22",
    },
    {
      id: 3,
      type: "video",
      url: "/placeholder.svg?height=300&width=400",
      title: "Live Streaming Tutorial",
      uploadedAt: "2023-09-10",
    },
    {
      id: 4,
      type: "image",
      url: "/placeholder.svg?height=300&width=400",
      title: "Mentor Profile Photo",
      uploadedAt: "2023-10-05",
    },
  ])

  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  const handleDelete = (id) => {
    setMediaItems(mediaItems.filter((item) => item.id !== id))
  }

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterType === "all" || item.type === filterType
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Media Library</h1>
        <Link href="/dashboard/media/upload" className="btn-primary flex items-center">
          <Upload className="h-4 w-4 mr-1" />
          Upload Media
        </Link>
      </div>

      {/* Search and Filter */}
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

        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          >
            <option value="all">All Media</option>
            <option value="image">Images</option>
            <option value="video">Videos</option>
          </select>
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredMedia.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow overflow-hidden group">
            <div className="relative h-48 w-full">
              <Image src={item.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
              {item.type === "video" && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Film className="h-12 w-12 text-white opacity-70" />
                </div>
              )}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-2 bg-red-600 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800 truncate">{item.title}</h3>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>
                  {item.type === "image" ? (
                    <ImageIcon className="h-4 w-4 inline mr-1" />
                  ) : (
                    <Film className="h-4 w-4 inline mr-1" />
                  )}
                </span>
                <span>{item.uploadedAt}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredMedia.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <div className="flex justify-center mb-4">
            {filterType === "video" ? (
              <Film className="h-16 w-16 text-gray-300" />
            ) : (
              <ImageIcon className="h-16 w-16 text-gray-300" />
            )}
          </div>
          <h3 className="text-lg font-medium text-gray-800 mb-1">No media found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  )
}

