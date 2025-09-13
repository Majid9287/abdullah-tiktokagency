"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ExternalLink, Play, Film, ArrowLeft, Filter, Search, X, Maximize, Volume2, VolumeX } from "lucide-react"

export default function EventsPage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [platformFilter, setPlatformFilter] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const videoRef = useRef(null)

  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        search: searchTerm,
        type: typeFilter,
        platform: platformFilter,
        showAll: 'true'
      })

      const response = await fetch(`/api/events?${params}`)
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error("Error fetching events:", error)
    } finally {
      setLoading(false)
    }
  }, [searchTerm, typeFilter, platformFilter])

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])

  const getVideoThumbnail = (videoUrl, platform) => {
    if (!videoUrl) return '/event.png'

    if (platform === 'youtube') {
      const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
      return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '/event.png'
    } else if (platform === 'tiktok') {
      return '/event.png'
    }

    return '/event.png'
  }

  const getPlatformIcon = (platform) => {
    switch (platform) {
      case 'youtube':
        return <Play className="h-4 w-4 text-red-600" />
      case 'tiktok':
        return <Film className="h-4 w-4 text-black" />
      default:
        return <Play className="h-4 w-4 text-gray-600" />
    }
  }

  const getPlatformColor = (platform) => {
    switch (platform) {
      case 'youtube':
        return 'bg-red-600 hover:bg-red-700'
      case 'tiktok':
        return 'bg-black hover:bg-gray-800'
      default:
        return 'bg-gray-600 hover:bg-gray-700'
    }
  }

  const getPlatformBadge = (platform) => {
    switch (platform) {
      case 'youtube':
        return 'bg-red-100 text-red-800'
      case 'tiktok':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getYouTubeEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1&showinfo=0&rel=0` : null
  }

  const getTikTokEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.match(/(?:tiktok\.com\/@[\w.-]+\/video\/|vm\.tiktok\.com\/|tiktok\.com\/v\/)(\d+)/)?.[1]
    return videoId ? `https://www.tiktok.com/embed/${videoId}` : null
  }

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const openEventModal = (event) => {
    setSelectedEvent(event)
    setIsVideoPlaying(false)
    setIsMuted(true)
  }

  const closeEventModal = () => {
    setSelectedEvent(null)
    setIsVideoPlaying(false)
    setIsMuted(true)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  const clearFilters = () => {
    setSearchTerm("")
    setTypeFilter("all")
    setPlatformFilter("all")
  }

  const activeFiltersCount = [searchTerm, typeFilter !== "all", platformFilter !== "all"].filter(Boolean).length

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-orange-600 via-red-600 to-pink-600 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-96 h-96 bg-orange-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>
        
        {/* Floating Icons */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-1/4 text-white/10 text-6xl animate-bounce delay-500">🎬</div>
          <div className="absolute top-32 right-1/4 text-white/10 text-4xl animate-bounce delay-1000">🎥</div>
          <div className="absolute bottom-32 left-1/6 text-white/10 text-5xl animate-bounce delay-1500">📱</div>
          <div className="absolute bottom-20 right-1/3 text-white/10 text-3xl animate-bounce delay-2000">✨</div>
        </div>

        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-8 w-px bg-white/30"></div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm font-semibold uppercase tracking-wider">Live Content</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-white via-yellow-200 to-orange-200 bg-clip-text text-transparent">
                  Epic Events
                </h1>
                
              </div>
            </div>
          </div>

        
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search events..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-colors ${
                showFilters 
                  ? 'bg-blue-600 text-white border-blue-600' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter className="h-5 w-5" />
              Filters
              {activeFiltersCount > 0 && (
                <span className="bg-white text-blue-600 text-xs font-bold px-2 py-1 rounded-full">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Filter Options */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Event Type</label>
                  <select
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Types</option>
                    <option value="video">Videos</option>
                    <option value="image">Images</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">Platform</label>
                  <select
                    value={platformFilter}
                    onChange={(e) => setPlatformFilter(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="all">All Platforms</option>
                    <option value="youtube">YouTube</option>
                    <option value="tiktok">TikTok</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {activeFiltersCount > 0 && (
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-gray-600 hover:text-gray-800 underline"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <div className="text-gray-600">
            Showing <span className="font-semibold text-gray-900">{events.length}</span> events
            {searchTerm && (
              <span> for &ldquo;<span className="font-semibold">{searchTerm}</span>&rdquo;</span>
            )}
          </div>
        </div>

        {/* Events Grid */}
        {events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event._id} className="group">
                <div 
                  className="relative overflow-hidden rounded-2xl shadow-lg bg-white hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
                  onClick={() => openEventModal(event)}
                >
                  <div className="relative h-64 w-full">
                    <Image
                      src={event.type === 'video' 
                        ? (event.thumbnail || getVideoThumbnail(event.videoUrl, event.platform))
                        : (event.imageUrl || '/event.png')
                      }
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    
                    {/* Platform Badge */}
                    <div className="absolute top-4 left-4">
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getPlatformBadge(event.platform)} backdrop-blur-sm`}>
                        {getPlatformIcon(event.platform)}
                        <span className="text-xs font-semibold uppercase">
                          {event.type === 'video' ? 'Video' : 'Image'}
                        </span>
                      </div>
                    </div>

                    {/* Play Button for Videos */}
                    {event.type === 'video' && event.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className={`p-4 rounded-full ${getPlatformColor(event.platform)} opacity-90 group-hover:opacity-100 transition-opacity`}>
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-3">
                      <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                      <span className="text-sm text-gray-500">
                        {new Date(event.createdAt).toLocaleDateString('en-US', {
                          month: 'long',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
                    
                    <p className="text-gray-600 mb-6 line-clamp-3">{event.description}</p>

                    {event.type === 'video' && event.videoUrl && (
                      <a
                        href={event.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getPlatformColor(event.platform)} text-white font-semibold hover:shadow-lg transition-all`}
                      >
                        Watch Now
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No events found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchTerm || typeFilter !== 'all' || platformFilter !== 'all'
                ? 'Try adjusting your search terms or filters to find what you\'re looking for.'
                : 'No events are available at the moment. Check back soon!'
              }
            </p>
            {(searchTerm || typeFilter !== 'all' || platformFilter !== 'all') && (
              <button
                onClick={clearFilters}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>

      {/* Event Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center gap-4">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full ${getPlatformBadge(selectedEvent.platform)}`}>
                  {getPlatformIcon(selectedEvent.platform)}
                  <span className="text-sm font-semibold uppercase">
                    {selectedEvent.type === 'video' ? 'Video' : 'Image'}
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {new Date(selectedEvent.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
              </div>
              <button
                onClick={closeEventModal}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{selectedEvent.title}</h2>
              
              {/* Video/Image Display */}
              <div className="relative mb-6">
                <div className="relative w-full h-96 bg-gray-100 rounded-xl overflow-hidden">
                  {selectedEvent.type === 'video' && selectedEvent.videoUrl ? (
                    <div className="relative w-full h-full">
                      {selectedEvent.platform === 'youtube' ? (
                        <iframe
                          ref={videoRef}
                          src={getYouTubeEmbedUrl(selectedEvent.videoUrl)}
                          className="w-full h-full"
                          title={selectedEvent.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : selectedEvent.platform === 'tiktok' ? (
                        <iframe
                          ref={videoRef}
                          src={getTikTokEmbedUrl(selectedEvent.videoUrl)}
                          className="w-full h-full"
                          title={selectedEvent.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : (
                        <div className="relative w-full h-full group">
                          <video
                            ref={videoRef}
                            className="w-full h-full object-cover"
                            poster={selectedEvent.thumbnail || getVideoThumbnail(selectedEvent.videoUrl, selectedEvent.platform)}
                            muted={isMuted}
                            onPlay={() => setIsVideoPlaying(true)}
                            onPause={() => setIsVideoPlaying(false)}
                            onClick={toggleVideoPlay}
                          >
                            <source src={selectedEvent.videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                          
                          {/* Video Controls Overlay */}
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={toggleVideoPlay}
                                className="p-4 rounded-full bg-white/90 hover:bg-white transition-colors"
                              >
                                {isVideoPlaying ? (
                                  <div className="w-6 h-6 border-l-3 border-r-3 border-gray-800"></div>
                                ) : (
                                  <Play className="h-6 w-6 text-gray-800 ml-1" />
                                )}
                              </button>
                            </div>
                            
                            <div className="absolute bottom-4 right-4 flex gap-2">
                              <button
                                onClick={toggleMute}
                                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                              >
                                {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                              </button>
                              <button
                                onClick={toggleFullscreen}
                                className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                              >
                                <Maximize className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          {/* Always visible play button when paused */}
                          {!isVideoPlaying && (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <button
                                onClick={toggleVideoPlay}
                                className="p-6 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                              >
                                <Play className="h-10 w-10 text-white ml-1" />
                              </button>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Image
                      src={selectedEvent.imageUrl || '/event.png'}
                      alt={selectedEvent.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
              </div>

              {/* Event Details */}
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                
                {selectedEvent.type === 'video' && selectedEvent.videoUrl && (
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={selectedEvent.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full ${getPlatformColor(selectedEvent.platform)} text-white font-semibold hover:shadow-lg transition-all`}
                    >
                      Watch on {selectedEvent.platform === 'youtube' ? 'YouTube' : selectedEvent.platform === 'tiktok' ? 'TikTok' : 'Platform'}
                      <ExternalLink className="h-4 w-4" />
                    </a>
                    <button
                      onClick={toggleFullscreen}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-all"
                    >
                      Fullscreen
                      <Maximize className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Video Modal */}
      {isFullscreen && selectedEvent && selectedEvent.type === 'video' && selectedEvent.videoUrl && (
        <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
          <button
            onClick={toggleFullscreen}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <X className="h-6 w-6 text-white" />
          </button>
          
          <div className="w-full h-full flex items-center justify-center p-4">
            {selectedEvent.platform === 'youtube' ? (
              <iframe
                src={getYouTubeEmbedUrl(selectedEvent.videoUrl)}
                className="w-full h-full max-w-6xl"
                title={selectedEvent.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : selectedEvent.platform === 'tiktok' ? (
              <iframe
                src={getTikTokEmbedUrl(selectedEvent.videoUrl)}
                className="w-full h-full max-w-6xl"
                title={selectedEvent.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full max-w-6xl object-contain"
                poster={selectedEvent.thumbnail || getVideoThumbnail(selectedEvent.videoUrl, selectedEvent.platform)}
                controls
                autoPlay
                muted={isMuted}
                onPlay={() => setIsVideoPlaying(true)}
                onPause={() => setIsVideoPlaying(false)}
              >
                <source src={selectedEvent.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
