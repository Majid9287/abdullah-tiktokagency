"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Calendar, Camera, ChevronLeft, ChevronRight, Clock, MapPin, ExternalLink } from "lucide-react"

export default function EventsMemoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const sliderRef = useRef(null)

  const items = [
    {
      type: "event",
      title: "Creator Summit 2023",
      date: "November 15, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "Virtual Event",
      image: "/event.png?height=600&width=1200",
      description:
        "Join us for a day of learning, networking, and inspiration with top TikTok creators. This exclusive event will feature workshops on content strategy, live streaming techniques, and monetization opportunities.",
      cta: "Register Now",
      gradient: "from-pink-400 to-purple-400",
      iconGradient: "from-pink-500 to-purple-500",
      textColor: "text-pink-600",
    },
    {
      type: "memory",
      title: "Summer Creator Camp",
      date: "July 2023",
      location: "Online",
      image: "/event.png?height=600&width=1200",
      description:
        "Our week-long virtual camp brought together creators from 15 countries. Participants learned advanced techniques for TikTok Live, collaborated on cross-border projects, and formed lasting connections with fellow creators.",
      gallery: [
        "/event.png?height=100&width=100",
        "/event.png?height=100&width=100",
        "/event.png?height=100&width=100",
        "/event.png?height=100&width=100",
      ],
      gradient: "from-purple-400 to-indigo-400",
      iconGradient: "from-purple-500 to-indigo-500",
      textColor: "text-purple-600",
    },
    {
      type: "event",
      title: "Live Streaming Masterclass",
      date: "December 5, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      image: "/event.png?height=600&width=1200",
      description:
        "Learn advanced techniques for engaging live streams from our expert mentors. This hands-on workshop will cover equipment setup, audience engagement strategies, and tips for handling technical issues during live broadcasts.",
      cta: "Save Your Spot",
      gradient: "from-indigo-400 to-blue-400",
      iconGradient: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
    },
    {
      type: "memory",
      title: "Viral Challenge Workshop",
      date: "August 2023",
      location: "Online",
      image: "/event.png?height=600&width=1200",
      description:
        "Creators learned how to create and promote viral challenges. This collaborative session resulted in three challenges that collectively generated over 50 million views across TikTok.",
      gallery: [
        "/event.png?height=100&width=100",
        "/event.png?height=100&width=100",
        "/event.png?height=100&width=100",
      ],
      gradient: "from-blue-400 to-cyan-400",
      iconGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
    },
  ]

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % items.length)
  }, [items.length])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + items.length) % items.length)
  }, [items.length])

  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.style.transform = `translateX(-${currentSlide * 100}%)`
    }
  }, [currentSlide])

  // Auto-advance slides only when not hovering
  useEffect(() => {
    if (isHovering) return

    const interval = setInterval(() => {
      nextSlide()
    }, 8000)

    return () => clearInterval(interval)
  }, [nextSlide, isHovering])

  return (
    <section id="events" className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-teal-100 to-pink-100"></div> */}

      {/* Animated background elements
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-pink-500/10 text-pink-600 text-sm font-medium mb-3">
            CONNECT & CELEBRATE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">Events & Memories</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-pink-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-pink-900/70 max-w-2xl mx-auto">
            Join our exclusive events to learn from experts and connect with fellow creators, or explore memories from
            our past gatherings.
          </p>
        </div>

        {/* Full-width slider */}
        <div
          className="relative overflow-hidden rounded-2xl shadow-xl mb-16 bg-white/30 backdrop-blur-sm border border-white/50"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-all hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6 text-gray-800" />
          </button>

          {/* Slider Track */}
          <div
            ref={sliderRef}
            className="flex transition-transform duration-700 ease-in-out"
            style={{ width: `${items.length * 100}%` }}
          >
            {items.map((item, index) => (
              <div key={index} className="relative w-full" style={{ width: `${100 / items.length}%` }}>
                {/* Background Image with gradient overlay */}
                <div className="relative h-[550px] w-full overflow-hidden">
                  <Image
                    src={item.image || "/event.png"}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-10000 hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-60 mix-blend-overlay`}
                  ></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="flex items-center mb-3">
                    <div className={`p-2 rounded-full bg-white/20 backdrop-blur-sm mr-3`}>
                      {item.type === "event" ? (
                        <Calendar className="h-5 w-5 text-white" />
                      ) : (
                        <Camera className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <span
                      className={`text-sm font-medium uppercase tracking-wider ${item.textColor} bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full`}
                    >
                      {item.type === "event" ? "Upcoming Event" : "Memory"}
                    </span>
                  </div>

                  <h3 className="text-3xl md:text-4xl font-bold mb-3 text-white">{item.title}</h3>

                  <div className="flex flex-wrap items-center mb-4 gap-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-white/80" />
                      <span className="text-white/90">{item.date}</span>
                    </div>

                    {item.time && (
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-white/80" />
                        <span className="text-white/90">{item.time}</span>
                      </div>
                    )}

                    {item.location && (
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-white/80" />
                        <span className="text-white/90">{item.location}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-white/90 mb-6 max-w-3xl text-lg">{item.description}</p>

                  {item.type === "event" ? (
                    <button
                      className={`px-6 py-3 rounded-full bg-gradient-to-r ${item.gradient} text-white font-medium hover:shadow-lg transition-all transform hover:-translate-y-1 active:translate-y-0 flex items-center`}
                    >
                      {item.cta}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </button>
                  ) : (
                    <div className="flex flex-wrap gap-3 items-center">
                      {item.gallery &&
                        item.gallery.map((img, i) => (
                          <div
                            key={i}
                            className="relative h-16 w-16 rounded-lg overflow-hidden border-2 border-white/50 hover:scale-110 transition-transform"
                          >
                            <Image
                              src={img || "/event.png"}
                              alt={`Gallery ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      <button
                        className={`ml-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all flex items-center`}
                      >
                        View Gallery
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}

