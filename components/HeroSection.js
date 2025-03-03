"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

export default function HeroSection() {
  const [showJoinLink, setShowJoinLink] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  
  const videoThumbs = [
    "/hero1.jpg?height=600&width=300",
    "/hero2.jpg?height=600&width=300",
    "/hero3.jpg?height=600&width=300"
  ]
  
  const videoTexts = [
    "Grow your audience with expert guidance",
    "Monetize your content effectively",
    "Join our global creator community"
  ]
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoThumbs.length)
    }, 3000)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-gradient-to-r from-pink-600 to-purple-600 text-white py-16 md:py-24 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-20 right-20 w-60 h-60 bg-purple-400 rounded-full opacity-20 animate-pulse" style={{animationDelay: "1s"}}></div>
        <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-pink-300 rounded-full opacity-20 animate-pulse" style={{animationDelay: "2s"}}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Become a TikTok <span className="text-pink-300">Live Star</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-pink-100">
              Join Abdullah Agency and transform your TikTok presence with expert mentorship, training, and a supportive
              community.
            </p>

            <div className="space-y-4">
              <button onClick={() => setShowJoinLink(true)} className="btn-primary text-lg px-8 py-3 animate-bounce">
                Join Now
              </button>

              {showJoinLink && (
                <div className="bg-white text-pink-600 p-4 rounded-lg shadow-lg animate-fade-in">
                  <p className="font-semibold">
                    Join us on TikTok:{" "}
                    <a href="https://tiktok.com/@abdullahagency" className="underline">
                      @abdullahagency
                    </a>
                  </p>
                </div>
              )}
            </div>
            
            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-3xl font-bold text-pink-900">1M+</span>
                <p className="text-sm text-pink-900">Followers Gained</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-3xl font-bold text-pink-900">50+</span>
                <p className="text-sm text-pink-900">Countries</p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2">
                <span className="text-3xl font-bold text-pink-900">24/7</span>
                <p className="text-sm text-pink-900">Support</p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* TikTok-style phone frame */}
              <div className="relative w-[280px] h-[560px] bg-black rounded-3xl border-4 border-gray-800 shadow-2xl overflow-hidden">
                {/* Video content */}
                <div className="absolute inset-0">
                  {videoThumbs.map((src, index) => (
                    <div 
                      key={index} 
                      className={`absolute inset-0 transition-opacity duration-1000 ${currentVideo === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                      <Image
                        src={src || "/placeholder.svg"}
                        alt={`TikTok content ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                        <p className="text-white text-lg font-medium">{videoTexts[index]}</p>
                        <div className="flex items-center mt-2">
                          <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center mr-2">
                            <span className="text-white text-xs">AA</span>
                          </div>
                          <span className="text-white">@abdullahagency</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* TikTok UI elements */}
                <div className="absolute right-3 bottom-20 flex flex-col items-center space-y-4">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                      </svg>
                    </div>
                    <span className="text-white text-xs">1.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                    </div>
                    <span className="text-white text-xs">Share</span>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-400 rounded-full opacity-30 animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-purple-400 rounded-full opacity-30 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
