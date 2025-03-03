"use client"

import { useState } from "react"
import { Globe } from "lucide-react"
import Image from "next/image"

export default function CountriesSection() {
  const [hoveredRegion, setHoveredRegion] = useState(null)

  const regions = [
    {
      id: "asia",
      name: "Asia",
      countries: 12,
      description: "Covering major markets including Japan, South Korea, India, and Southeast Asia",
      color: "bg-pink-500",
    },
    {
      id: "europe",
      name: "Europe",
      countries: 15,
      description: "Strong presence across Western and Eastern European countries",
      color: "bg-purple-500",
    },
    {
      id: "americas",
      name: "Americas",
      countries: 8,
      description: "From Canada to Argentina, covering North and South America",
      color: "bg-blue-500",
    },
    {
      id: "africa",
      name: "Africa & Middle East",
      countries: 10,
      description: "Growing presence in emerging markets across Africa and the Middle East",
      color: "bg-yellow-500",
    },
    {
      id: "oceania",
      name: "Oceania",
      countries: 5,
      description: "Australia, New Zealand and Pacific Island nations",
      color: "bg-green-500",
    },
  ]

  return (
    <section id="countries" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Global Reach</h2>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center mb-4">
            <Globe className="h-12 w-12 text-pink-500 mr-3" />
            <h3 className="text-2xl font-bold text-gray-800">50+ Countries Worldwide</h3>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Abdullah Agency welcomes creators from around the world. Our global network provides you with international
            exposure and opportunities.
          </p>
        </div>

        {/* World Map Visualization */}
        <div className="relative w-full h-[400px] bg-gray-100 rounded-xl mb-12 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <Image src="/placeholder.svg?height=400&width=1200" alt="World Map" fill className="object-cover" />
          </div>

          {/* Region Hotspots */}
          <div
            className="absolute top-1/4 left-2/3 w-6 h-6 rounded-full bg-pink-500 animate-pulse cursor-pointer"
            onMouseEnter={() => setHoveredRegion("asia")}
            onMouseLeave={() => setHoveredRegion(null)}
          ></div>

          <div
            className="absolute top-1/4 left-1/2 w-6 h-6 rounded-full bg-purple-500 animate-pulse cursor-pointer"
            onMouseEnter={() => setHoveredRegion("europe")}
            onMouseLeave={() => setHoveredRegion(null)}
          ></div>

          <div
            className="absolute top-1/3 left-1/4 w-6 h-6 rounded-full bg-blue-500 animate-pulse cursor-pointer"
            onMouseEnter={() => setHoveredRegion("americas")}
            onMouseLeave={() => setHoveredRegion(null)}
          ></div>

          <div
            className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-yellow-500 animate-pulse cursor-pointer"
            onMouseEnter={() => setHoveredRegion("africa")}
            onMouseLeave={() => setHoveredRegion(null)}
          ></div>

          <div
            className="absolute top-2/3 left-3/4 w-6 h-6 rounded-full bg-green-500 animate-pulse cursor-pointer"
            onMouseEnter={() => setHoveredRegion("oceania")}
            onMouseLeave={() => setHoveredRegion(null)}
          ></div>

          {/* Hover Information */}
          {hoveredRegion && (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg z-10 min-w-[200px]">
              <div className={`w-4 h-4 rounded-full ${regions.find((r) => r.id === hoveredRegion).color} mb-2`}></div>
              <h4 className="font-bold">{regions.find((r) => r.id === hoveredRegion).name}</h4>
              <p className="text-sm text-gray-600">{regions.find((r) => r.id === hoveredRegion).countries} countries</p>
              <p className="text-xs text-gray-500 mt-1">{regions.find((r) => r.id === hoveredRegion).description}</p>
            </div>
          )}
        </div>

        {/* Region Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {regions.map((region) => (
            <div key={region.id} className="bg-white rounded-lg shadow p-4 hover:shadow-md transition-shadow">
              <div
                className={`w-8 h-8 rounded-full ${region.color} mb-3 flex items-center justify-center text-white font-bold`}
              >
                {region.name.charAt(0)}
              </div>
              <h4 className="font-bold text-gray-800">{region.name}</h4>
              <p className="text-sm text-gray-600">{region.countries} countries</p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">Dont see your country? Were constantly expanding!</p>
          <button className="btn-secondary">Check Eligibility</button>
        </div>
      </div>
    </section>
  )
}

