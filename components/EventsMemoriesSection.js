"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronLeft, ChevronRight, ExternalLink, Play, Film, Image as ImageIcon, ArrowRight, Maximize, X, Volume2, VolumeX } from "lucide-react"

export default function EventsMemoriesSection() {
  const [events, setEvents] = useState([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const [showThumbnail, setShowThumbnail] = useState(true)
  const sliderRef = useRef(null)
  const videoRef = useRef(null)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events?showAll=false')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
      setEvents([])
    }
  }

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

  const nextSlide = useCallback(() => {
    const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
    const totalSlides = Math.ceil(remainingEvents.length / 4)
    if (totalSlides > 1) {
      setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }
  }, [events, selectedEvent])

  const prevSlide = useCallback(() => {
    const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
    const totalSlides = Math.ceil(remainingEvents.length / 4)
    if (totalSlides > 1) {
      setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }
  }, [events, selectedEvent])

  const handleEventSelect = (event) => {
    setSelectedEvent(event)
    setIsVideoPlaying(false)
    setShowThumbnail(true)
    if (videoRef.current && videoRef.current.pause) {
      videoRef.current.pause()
    }
  }

  const toggleVideoPlay = () => {
    if (videoRef.current && videoRef.current.pause && videoRef.current.play) {
      if (isVideoPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsVideoPlaying(!isVideoPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current && videoRef.current.muted !== undefined) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const getYouTubeEmbedUrl = (videoUrl) => {
    const videoId = videoUrl.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)?.[1]
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=0&mute=1&controls=1&showinfo=0&rel=0` : null
  }

  const getTikTokEmbedUrl = (videoUrl) => {
    // Extract TikTok video ID from various TikTok URL formats
    const videoId = videoUrl.match(/(?:tiktok\.com\/@[\w.-]+\/video\/|vm\.tiktok\.com\/|tiktok\.com\/v\/)(\d+)/)?.[1]
    return videoId ? `https://www.tiktok.com/embed/${videoId}` : null
  }

  useEffect(() => {
    const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
    const totalSlides = Math.ceil(remainingEvents.length / 4)
    if (sliderRef.current && totalSlides > 1) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
    }
  }, [currentSlide, events, selectedEvent])

  // Auto-advance slides only when not hovering
  useEffect(() => {
    const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
    const totalSlides = Math.ceil(remainingEvents.length / 4)
    if (isHovering || totalSlides <= 1) return

    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide, isHovering, events, selectedEvent])

  if (events.length === 0) {
    return (
      <section id="events" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <span className="inline-block py-2 px-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
              EVENTS & MEMORIES
            </span>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Featured Events</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              No events available at the moment. Check back soon for amazing content!
            </p>
          </div>
        </div>
      </section>
    )
  }

  const featuredEvent = selectedEvent || events[0]
  const remainingEvents = events.filter(event => event._id !== featuredEvent?._id)

  return (
    <section id="events" className="py-20 relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block py-2 px-6 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
            EVENTS & MEMORIES
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Featured Events</h2>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full mb-8"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our latest events and explore our collection of amazing content from creators around the world.
          </p>
        </div>

        {/* Featured Event - Large Display */}
        {featuredEvent && (
          <div className="mb-16">
            <div className="relative group overflow-hidden rounded-3xl shadow-2xl bg-white">
              <div className="relative h-[500px] md:h-[600px] w-full">
                {featuredEvent.type === 'video' && featuredEvent.videoUrl ? (
                  <div className="relative w-full h-full">
                    {featuredEvent.platform === 'youtube' ? (
                      featuredEvent.thumbnail && showThumbnail ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={featuredEvent.thumbnail}
                            alt={featuredEvent.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => setShowThumbnail(false)}
                              className="p-8 rounded-full bg-red-600/90 hover:bg-red-600 transition-colors backdrop-blur-sm"
                            >
                              <Play className="h-12 w-12 text-white ml-2" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                              <Maximize className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          ref={videoRef}
                          src={getYouTubeEmbedUrl(featuredEvent.videoUrl)}
                          title={featuredEvent.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )
                    ) : featuredEvent.platform === 'tiktok' ? (
                      featuredEvent.thumbnail && showThumbnail ? (
                        <div className="relative w-full h-full group">
                          <Image
                            src={featuredEvent.thumbnail}
                            alt={featuredEvent.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-black/20"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={() => setShowThumbnail(false)}
                              className="p-8 rounded-full bg-black/90 hover:bg-black transition-colors backdrop-blur-sm"
                            >
                              <Play className="h-12 w-12 text-white ml-2" />
                            </button>
                          </div>
                          <div className="absolute bottom-4 right-4">
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                              <Maximize className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <iframe
                          ref={videoRef}
                          src={getTikTokEmbedUrl(featuredEvent.videoUrl)}
                          title={featuredEvent.title}
                          className="w-full h-full"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      )
                    ) : (
                      <div className="relative w-full h-full group">
                        <video
                          ref={videoRef}
                          className="w-full h-full object-cover"
                          poster={featuredEvent.thumbnail || getVideoThumbnail(featuredEvent.videoUrl, featuredEvent.platform)}
                          muted={isMuted}
                          onPlay={() => setIsVideoPlaying(true)}
                          onPause={() => setIsVideoPlaying(false)}
                          onClick={toggleVideoPlay}
                        >
                          <source src={featuredEvent.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        
                        {/* Video Controls Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={toggleVideoPlay}
                              className="p-6 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                              {isVideoPlaying ? (
                                <div className="w-8 h-8 border-l-4 border-r-4 border-gray-800"></div>
                              ) : (
                                <Play className="h-8 w-8 text-gray-800 ml-1" />
                              )}
                            </button>
                          </div>
                          
                          <div className="absolute bottom-4 right-4 flex gap-2">
                            <button
                              onClick={toggleMute}
                              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                            </button>
                            <button
                              onClick={toggleFullscreen}
                              className="p-2 rounded-full bg-white/90 hover:bg-white transition-colors"
                            >
                              <Maximize className="h-5 w-5" />
                            </button>
                          </div>
                        </div>

                        {/* Always visible play button when paused */}
                        {!isVideoPlaying && (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <button
                              onClick={toggleVideoPlay}
                              className="p-8 rounded-full bg-black/50 hover:bg-black/70 transition-colors backdrop-blur-sm"
                            >
                              <Play className="h-12 w-12 text-white ml-2" />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <Image
                      src={featuredEvent.imageUrl || '/event.png'}
                      alt={featuredEvent.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  </>
                )}
                
                {/* Platform Badge */}
                <div className="absolute top-6 left-6">
                  <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${getPlatformBadge(featuredEvent.platform)} backdrop-blur-sm`}>
                    {getPlatformIcon(featuredEvent.platform)}
                    <span className="text-sm font-semibold uppercase tracking-wide">
                      {featuredEvent.type === 'video' ? 'Video' : 'Image'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                  <div className="max-w-4xl" onClick={toggleFullscreen}>
                    <div className="flex items-center mb-4">
                      <Calendar className="h-5 w-5 mr-2 text-white/80" />
                      <span className="text-white/90 text-lg">
                        {new Date(featuredEvent.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                    
                    <h3 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{featuredEvent.title}</h3>
                    
                    <p className="text-xl text-white/90 mb-8 max-w-3xl leading-relaxed">
                      {featuredEvent.description}
                    </p>

                    {featuredEvent.type === 'video' && featuredEvent.videoUrl && (
                      <div className="flex gap-4">
                        <a
                          href={featuredEvent.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-3 px-8 py-4 rounded-full ${getPlatformColor(featuredEvent.platform)} text-white font-semibold text-lg hover:shadow-xl transition-all transform hover:-translate-y-1 active:translate-y-0`}
                        >
                          Watch on {featuredEvent.platform === 'youtube' ? 'YouTube' : featuredEvent.platform === 'tiktok' ? 'TikTok' : 'Platform'}
                          <ExternalLink className="h-5 w-5" />
                        </a>
                        <button
                          onClick={toggleFullscreen}
                          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold text-lg hover:bg-white/30 transition-all transform hover:-translate-y-1 active:translate-y-0"
                        >
                          Fullscreen
                          <Maximize className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* Remaining Events Slider */}
        {remainingEvents.length > 0 && (
          <div className="relative">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-gray-900">More Events</h3>
              <Link 
                href="/events"
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold group"
              >
                View All Events
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div
              className="relative overflow-hidden rounded-2xl"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Arrows */}
              {(() => {
                const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
                const totalSlides = Math.ceil(remainingEvents.length / 4)
                return totalSlides > 1 && (
                  <>
          <button
            onClick={prevSlide}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                      aria-label="Previous events"
          >
                      <ChevronLeft className="h-5 w-5 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
                      aria-label="Next events"
          >
                      <ChevronRight className="h-5 w-5 text-gray-800" />
          </button>
                  </>
                )
              })()}

          {/* Slider Track */}
          <div
            ref={sliderRef}
                className="flex transition-transform duration-500 ease-in-out"
                style={{ width: `${Math.ceil(remainingEvents.length / 4) * 100}%` }}
              >
                {Array.from({ length: Math.ceil(remainingEvents.length / 4) }, (_, slideIndex) => (
                  <div key={slideIndex} className="relative w-full" style={{ width: `${100 / Math.ceil(remainingEvents.length / 4)}%` }}>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4">
                      {remainingEvents.slice(slideIndex * 4, (slideIndex + 1) * 4).map((event) => (
                        <div 
                          key={event._id} 
                          className="relative group overflow-hidden rounded-xl shadow-lg bg-white hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                          onClick={() => handleEventSelect(event)}
                        >
                          <div className="relative h-48 w-full">
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
                            <div className="absolute top-2 left-2">
                              <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${getPlatformBadge(event.platform)} backdrop-blur-sm`}>
                                {getPlatformIcon(event.platform)}
                                <span className="text-xs font-semibold uppercase">
                                  {event.type === 'video' ? 'Video' : 'Image'}
                                </span>
                              </div>
                </div>

                            {/* Play Button for Videos */}
                            {event.type === 'video' && event.videoUrl && (
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className={`p-3 rounded-full ${getPlatformColor(event.platform)} opacity-90 group-hover:opacity-100 transition-opacity`}>
                                  <Play className="h-5 w-5 text-white ml-0.5" />
                                </div>
                              </div>
                            )}

                            {/* Selection Indicator */}
                            {selectedEvent?._id === event._id && (
                              <div className="absolute top-2 right-2">
                                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                  <div className="w-2 h-2 bg-white rounded-full"></div>
                                </div>
                              </div>
                            )}
                    </div>

                          <div className="p-4">
                            <div className="flex items-center mb-2">
                              <Calendar className="h-3 w-3 mr-1 text-gray-500" />
                              <span className="text-xs text-gray-500">
                                {new Date(event.createdAt).toLocaleDateString('en-US', {
                                  month: 'short',
                                  day: 'numeric'
                                })}
                    </span>
                  </div>

                            <h4 className="text-sm font-bold text-gray-900 mb-2 line-clamp-2">{event.title}</h4>

                            <p className="text-xs text-gray-600 line-clamp-2">{event.description}</p>
                    </div>
                  </div>
                      ))}
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
              {(() => {
                const remainingEvents = events.filter(event => event._id !== (selectedEvent || events[0])?._id)
                const totalSlides = Math.ceil(remainingEvents.length / 4)
                return totalSlides > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {Array.from({ length: totalSlides }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                        className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
                )
              })()}
        </div>
          </div>
        )}
      </div>

      {/* Fullscreen Video Modal */}
      {isFullscreen && featuredEvent && (
        <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
          <div className="relative w-full h-full">
            {/* Close Button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 z-10 p-2 bg-gray-600/80 backdrop-blur-sm rounded-full hover:bg-gray-700/80 transition-colors"
            >
              <X className="h-6 w-6 text-white" />
            </button>

            {/* Video Content */}
            {featuredEvent.type === 'video' && featuredEvent.videoUrl ? (
              <div className="w-full h-full">
                {featuredEvent.platform === 'youtube' ? (
                  <iframe
                    src={getYouTubeEmbedUrl(featuredEvent.videoUrl)}
                    title={featuredEvent.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : featuredEvent.platform === 'tiktok' ? (
                  <iframe
                    src={getTikTokEmbedUrl(featuredEvent.videoUrl)}
                    title={featuredEvent.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <video
                    ref={videoRef}
                    className="w-full h-full object-contain"
                    poster={featuredEvent.thumbnail || getVideoThumbnail(featuredEvent.videoUrl, featuredEvent.platform)}
                    controls
                    autoPlay
                    muted={isMuted}
                    onPlay={() => setIsVideoPlaying(true)}
                    onPause={() => setIsVideoPlaying(false)}
                  >
                    <source src={featuredEvent.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}
              </div>
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={featuredEvent.imageUrl || '/event.png'}
                  alt={featuredEvent.title}
                  fill
                  className="object-contain"
                />
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  )
}

