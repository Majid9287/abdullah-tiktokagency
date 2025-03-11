"use client"

import { useState } from "react"
import Image from "next/image"
import { TiktokIcon, InstagramIcon } from "./social-icons"

export default function MentorsSection() {
  const [activeCard, setActiveCard] = useState(null)

  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Lead Mentor",
      image: "/hero1.jpg?height=400&width=300",
      description: "With over 5M followers, Sarah specializes in lifestyle content and engagement strategies.",
      socialMedia: {
        tiktok: "@sarahjohnson",
        instagram: "@sarah.johnson",
      },
      gradient: "from-pink-400 to-purple-400",
      iconGradient: "from-pink-500 to-purple-500",
      textColor: "text-pink-600",
      stats: {
        followers: "5.2M",
        growth: "+320%",
        clients: "42",
      },
    },
    {
      name: "Michael Chen",
      role: "Growth Specialist",
      image: "/mentor1.jpg?height=400&width=300",
      description: "Michael has helped over 100 creators reach 1M+ followers with his unique growth tactics.",
      socialMedia: {
        tiktok: "@michaelchen",
        instagram: "@michael.chen",
      },
      gradient: "from-purple-400 to-indigo-400",
      iconGradient: "from-purple-500 to-indigo-500",
      textColor: "text-purple-600",
      stats: {
        followers: "3.8M",
        growth: "+215%",
        clients: "104",
      },
    },
    {
      name: "Aisha Patel",
      role: "Content Strategist",
      image: "/placeholder.svg?height=400&width=300",
      description: "Aisha is known for creating viral content that resonates with diverse audiences.",
      socialMedia: {
        tiktok: "@aishapatel",
        instagram: "@aisha.patel",
      },
      gradient: "from-indigo-400 to-blue-400",
      iconGradient: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
      stats: {
        followers: "4.1M",
        growth: "+280%",
        clients: "67",
      },
    },
    {
      name: "David Kim",
      role: "Monetization Expert",
      image: "/placeholder.svg?height=400&width=300",
      description: "David specializes in helping creators turn their passion into a sustainable income.",
      socialMedia: {
        tiktok: "@davidkim",
        instagram: "@david.kim",
      },
      gradient: "from-blue-400 to-cyan-400",
      iconGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      stats: {
        followers: "2.9M",
        growth: "+190%",
        clients: "83",
      },
    },
  ]

  return (
    <section id="mentors" className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-purple-100 to-indigo-100"></div> */}

      {/* Animated background elements
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium mb-3">
            EXPERT GUIDANCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">Meet Our Live Mentors</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-purple-900/70 max-w-2xl mx-auto">
            Learn from industry professionals who have mastered the art of TikTok content creation and growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setActiveCard(index)}
              onMouseLeave={() => setActiveCard(null)}
            >
              {/* Card with gradient border effect */}
              <div
                className={`relative overflow-hidden rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300`}
              >
                {/* Mentor image */}
                <div className="relative h-[420px] w-full">
                  <Image
                    src={mentor.image || "/placeholder.svg"}
                    alt={mentor.name}
                    fill
                    className="object-cover object-center transition-all duration-500 group-hover:scale-105"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/60 to-transparent opacity-90"></div>

                  {/* Colored accent top bar */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mentor.gradient}`}></div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6">
                    {/* Top section - Social media */}
                    <div className="flex justify-end space-x-2">
                      <a
                        href={`https://tiktok.com/${mentor.socialMedia.tiktok}`}
                        className={`bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-gradient-to-r ${mentor.gradient} hover:text-white transition-all`}
                      >
                        <TiktokIcon className={`w-5 h-5 ${mentor.textColor} group-hover:text-white`} />
                      </a>
                      <a
                        href={`https://instagram.com/${mentor.socialMedia.instagram}`}
                        className={`bg-white/80 backdrop-blur-sm p-2 rounded-full hover:bg-gradient-to-r ${mentor.gradient} hover:text-white transition-all`}
                      >
                        <InstagramIcon className={`w-5 h-5 ${mentor.textColor} group-hover:text-white`} />
                      </a>
                    </div>

                    {/* Bottom section - Mentor info */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 transform transition-all duration-500 group-hover:translate-y-0">
                      {/* Stats row */}
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="bg-white/80 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Followers</p>
                          <p className={`font-bold ${mentor.textColor}`}>{mentor.stats.followers}</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Growth</p>
                          <p className="text-green-500 font-bold">{mentor.stats.growth}</p>
                        </div>
                        <div className="bg-white/80 rounded-lg p-2 text-center">
                          <p className="text-xs text-gray-500">Clients</p>
                          <p className={`font-bold ${mentor.textColor}`}>{mentor.stats.clients}</p>
                        </div>
                      </div>

                      {/* Name and role */}
                      <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className={`h-0.5 w-6 bg-gradient-to-r ${mentor.gradient} mr-2`}></div>
                        <p className={`text-sm font-medium ${mentor.textColor}`}>{mentor.role}</p>
                      </div>

                      {/* Description - Only visible on hover */}
                      <div
                        className={`overflow-hidden transition-all duration-500 ${activeCard === index ? "max-h-20 opacity-100" : "max-h-0 opacity-0"}`}
                      >
                        <p className="text-gray-700 text-sm">{mentor.description}</p>
                      </div>

                      {/* Connect button */}
                      <button
                        className={`mt-4 w-full py-2 rounded-lg bg-gradient-to-r ${mentor.gradient} text-white text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-lg`}
                      >
                        Connect with {mentor.name.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Animated corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 translate-x-1/2 translate-y-1/2 bg-gradient-to-tl ${mentor.iconGradient} rounded-tl-xl opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:from-purple-600 hover:to-indigo-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
            Meet All Mentors
          </button>
        </div>
      </div>
    </section>
  )
}

