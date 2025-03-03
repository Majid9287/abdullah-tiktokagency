"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import Image from "next/image"
import { Calendar, Camera, ChevronLeft, ChevronRight, Clock } from "lucide-react"

export default function EventsMemoriesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef(null)

  const items = [
    {
      type: "event",
      title: "Creator Summit 2023",
      date: "November 15, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=600&width=1200",
      description:
        "Join us for a day of learning, networking, and inspiration with top TikTok creators. This exclusive event will feature workshops on content strategy, live streaming techniques, and monetization opportunities.",
      cta: "Register Now",
    },
    {
      type: "memory",
      title: "Summer Creator Camp",
      date: "July 2023",
      image: "/placeholder.svg?height=600&width=1200",
      description:
        "Our week-long virtual camp brought together creators from 15 countries. Participants learned advanced techniques for TikTok Live, collaborated on cross-border projects, and formed lasting connections with fellow creators.",
      gallery: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
    },
    {
      type: "event",
      title: "Live Streaming Masterclass",
      date: "December 5, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=600&width=1200",
      description:
        "Learn advanced techniques for engaging live streams from our expert mentors. This hands-on workshop will cover equipment setup, audience engagement strategies, and tips for handling technical issues during live broadcasts.",
      cta: "Save Your Spot",
    },
    {
      type: "memory",
      title: "Viral Challenge Workshop",
      date: "August 2023",
      image: "/placeholder.svg?height=600&width=1200",
      description:
        "Creators learned how to create and promote viral challenges. This collaborative session resulted in three challenges that collectively generated over 50 million views across TikTok.",
      gallery: [
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
        "/placeholder.svg?height=100&width=100",
      ],
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

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 8000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section id="events" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Events & Memories</h2>

        {/* Full-width slider */}
        <div className="relative overflow-hidden rounded-xl shadow-lg mb-8">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          >
            <ChevronLeft className="h-6 w-6 text-gray-800" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
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
                {/* Background Image */}
                <div className="relative h-[500px] w-full">
                  <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-8 text-black">
                  <div className="flex items-center mb-2">
                    {item.type === "event" ? (
                      <Calendar className="h-5 w-5 mr-2 text-pink-400" />
                    ) : (
                      <Camera className="h-5 w-5 mr-2 text-pink-400" />
                    )}
                    <span className="text-sm font-medium uppercase tracking-wider text-pink-300">
                      {item.type === "event" ? "Upcoming Event" : "Memory"}
                    </span>
                  </div>

                  <h3 className="text-3xl font-bold mb-2">{item.title}</h3>

                  <div className="flex items-center mb-4">
                    <Calendar className="h-4 w-4 mr-2 text-gray-300" />
                    <span className="text-gray-300 mr-4">{item.date}</span>

                    {item.time && (
                      <>
                        <Clock className="h-4 w-4 mr-2 text-gray-300" />
                        <span className="text-gray-300">{item.time}</span>
                      </>
                    )}
                  </div>

                  <p className="text-gray-200 mb-6 max-w-3xl">{item.description}</p>

                  {item.type === "event" ? (
                    <button className="btn-primary">{item.cta}</button>
                  ) : (
                    <div className="flex space-x-2">
                      {item.gallery &&
                        item.gallery.map((img, i) => (
                          <div key={i} className="relative h-16 w-16 rounded-md overflow-hidden">
                            <Image
                              src={img || "/placeholder.svg"}
                              alt={`Gallery ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      <button className="bg-white bg-opacity-20 backdrop-blur-sm text-black px-3 py-1 rounded-md text-sm">
                        View Gallery
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  currentSlide === index ? "bg-white scale-125" : "bg-white bg-opacity-50"
                }`}
              ></button>
            ))}
          </div>
        </div>

        {/* Upcoming Events Preview */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">More Upcoming Events</h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {items
              .filter((item) => item.type === "event")
              .map((event, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative h-48 w-full">
                    <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h4 className="font-bold text-gray-800 mb-2">{event.title}</h4>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{event.date}</span>
                    </div>
                    <button className="text-pink-600 font-medium text-sm hover:text-pink-700">Learn More →</button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  )
}

