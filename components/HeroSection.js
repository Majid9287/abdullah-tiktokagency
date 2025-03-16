"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, MessageCircle, Share2 } from "lucide-react"
import { useModal } from "./modal-context"

export default function HeroSection() {
  const [showJoinLink, setShowJoinLink] = useState(false)
  const [currentVideo, setCurrentVideo] = useState(0)
  const { openModal } = useModal()

  const videoThumbs = [
    "/hero1.jpg?height=600&width=300",
    "/hero2.jpg?height=600&width=300",
    "/hero3.jpg?height=600&width=300",
  ]

  const videoTexts = [
    "Grow your audience with expert guidance",
    "Monetize your content effectively",
    "Join our global creator community",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoThumbs.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative pt-24 min-h-screen flex items-center pb-8 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-600 to-indigo-700">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full opacity-20 animate-pulse"></div>
          <div
            className="absolute top-20 right-20 w-60 h-60 bg-purple-400 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-10 left-1/4 w-40 h-40 bg-pink-300 rounded-full opacity-20 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>

          {/* Additional floating elements */}
          <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-white rounded-full opacity-10 animate-float"></div>
          <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-white rounded-full opacity-10 animate-float-delayed"></div>

          {/* Light rays */}
          <div className="absolute top-0 left-1/2 w-1/2 h-screen bg-gradient-to-b from-pink-300/20 to-transparent transform -translate-x-1/2 rotate-15 opacity-30"></div>
          <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-b from-purple-300/20 to-transparent transform -rotate-15 opacity-20"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-white">
              Become a TikTok{" "}
              <span className="text-pink-300 relative">
                Live Star
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-pink-300 rounded-full"></span>
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 font-light">
              Join Abdullah Agency and transform your TikTok presence with expert mentorship, training, and a supportive
              community.
            </p>

            <div className="space-y-4">
              <button
                onClick={openModal}
                className="bg-white text-pink-600 px-8 py-3 rounded-full text-lg font-medium hover:bg-pink-100 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0"
              >
                Apply Now
              </button>

              {showJoinLink && (
                <div className="bg-white/90 backdrop-blur-sm text-pink-600 p-4 rounded-lg shadow-lg animate-fade-in">
                  <p className="font-semibold">
                    Join us on TikTok:{" "}
                    <a
                      href="https://tiktok.com/@abdullahagency"
                      className="underline hover:text-pink-800 transition-colors"
                    >
                      @abdullahagency
                    </a>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 flex justify-center md:justify-start space-x-4">
              {[
                { value: "1M+", label: "Followers Gained" },
                { value: "50+", label: "Countries" },
                { value: "24/7", label: "Support" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-3 border border-white/20 hover:bg-white/20 transition-all"
                >
                  <span className="text-3xl font-bold text-white">{stat.value}</span>
                  <p className="text-sm text-white/80">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              {/* Phone frame with glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-500 rounded-3xl blur opacity-70 animate-pulse"></div>

              {/* TikTok-style phone frame */}
              <div className="relative w-[280px] h-[560px] bg-black rounded-3xl border-[3px] border-gray-800 shadow-2xl overflow-hidden">
                {/* Video content */}
                <div className="absolute inset-0">
                  {videoThumbs.map((src, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ${currentVideo === index ? "opacity-100" : "opacity-0"}`}
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
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                      <Heart className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white text-xs mt-1">87.4K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                      <MessageCircle className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white text-xs mt-1">1.2K</span>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer">
                      <Share2 className="h-5 w-5 text-white" />
                    </div>
                    <span className="text-white text-xs mt-1">Share</span>
                  </div>
                </div>

                {/* TikTok top UI */}
                <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center">
                  <div className="w-8 h-8 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center">
                    <span className="text-white text-xs">Live</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-1 animate-pulse"></div>
                      <span className="text-white text-xs">2.4K</span>
                    </div>
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

