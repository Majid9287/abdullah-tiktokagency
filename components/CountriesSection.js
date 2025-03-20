"use client"

import { useState, useEffect } from "react"
import { Globe, MapPin } from "lucide-react"
import Image from "next/image"

export default function CountriesSection() {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [activeRegion, setActiveRegion] = useState(null)

  // Auto-cycle through regions when none is hovered
  useEffect(() => {
    if (hoveredRegion === null) {
      const interval = setInterval(() => {
        setActiveRegion((prev) => {
          const nextIndex = regions.findIndex((r) => r.id === prev) + 1
          return regions[nextIndex % regions.length]?.id || regions[0].id
        })
      }, 3000)
      return () => clearInterval(interval)
    } else {
      setActiveRegion(hoveredRegion)
    }
  }, [hoveredRegion])

  const regions = [
   
    // Updated UK region with all specified countries
    {
      id: "uk",
      name: "UK & European Regions",
      countries: 18,
      description: "Complete coverage across UK, Ireland, and Eastern European countries",
      gradient: "from-emerald-400 to-teal-400",
      iconGradient: "from-emerald-500 to-teal-500",
      textColor: "text-emerald-600",
      position: { top: "23%", left: "44%" },
      countryList: [
        "UK",
        "Ireland",
        "Jersey",
        "Isle of Man",
        "Greece",
        "Albania",
        "Lithuania",
        "Serbia",
        "Latvia",
        "Estonia",
        "Macedonia",
        "Bosnia",
        "Malta",
        "Montenegro",
        "Faroe Islands",
        "Gibraltar",
        "Guernsey",
        "Congo",
      ],
    },
    // MENA region with no countries (as requested)
    {
      id: "mena",
      name: "MENA Region",
      countries: 0,
      description: "Middle East and North Africa region",
      gradient: "from-amber-400 to-orange-400",
      iconGradient: "from-amber-500 to-orange-500",
      textColor: "text-amber-600",
      position: { top: "38%", left: "58%" },
      countryList: ["UAE", "Saudi Arabia", "Egypt", "Morocco", "Algeria", "Jordan", "Qatar", "Kuwait", "Oman", "Bahrain"]
    
    },
  ]

  return (
    <section id="countries" className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-indigo-500/10 text-indigo-600 text-sm font-medium mb-3">
            GLOBAL PRESENCE
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4">Our Worldwide Network</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-indigo-900/70 max-w-2xl mx-auto">
            Abdullah Agency welcomes creators from around the world. Our global network provides you with international
            exposure and opportunities.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-center mb-16">
          {/* World Map Visualization */}
          <div className="lg:w-2/3 w-full">
            <div className="relative w-full h-[400px] rounded-2xl overflow-hidden bg-white/50 backdrop-blur-sm border border-white/50 shadow-xl">
              <div className="absolute inset-0">
                <Image src="/map.jpg?height=400&width=800" alt="World Map" fill className="object-cover opacity-40" />
              </div>

              {/* Map overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-cyan-500/5"></div>

              {/* Region Hotspots */}
              {regions.map((region) => (
                <div
                  key={region.id}
                  className="absolute z-20"
                  style={{ top: region.position.top, left: region.position.left }}
                  onMouseEnter={() => setHoveredRegion(region.id)}
                  onMouseLeave={() => setHoveredRegion(null)}
                >
                  <div className={`relative group cursor-pointer`}>
                    {/* Pulse effect */}
                    <div
                      className={`absolute -inset-4 rounded-full bg-gradient-to-r ${region.gradient} opacity-30 group-hover:opacity-50 animate-ping-slow`}
                    ></div>

                    {/* Pin */}
                    <div
                      className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${region.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${activeRegion === region.id ? "scale-125" : "scale-100"}`}
                    >
                      <MapPin className="h-4 w-4 text-white" />
                    </div>

                    {/* Connection line to info card - only visible when active */}
                    {activeRegion === region.id && (
                      <div
                        className={`absolute w-px h-16 bg-gradient-to-b ${region.gradient} left-1/2 transform -translate-x-1/2`}
                        style={{
                          top: "100%",
                        }}
                      ></div>
                    )}
                  </div>
                </div>
              ))}

              {/* Active Region Information Card */}
              {activeRegion && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md animate-fade-in">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-r ${regions.find((r) => r.id === activeRegion)?.gradient} flex items-center justify-center text-white font-bold shrink-0`}
                      >
                        {regions.find((r) => r.id === activeRegion)?.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold ${regions.find((r) => r.id === activeRegion)?.textColor}`}>
                          {regions.find((r) => r.id === activeRegion)?.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {regions.find((r) => r.id === activeRegion)?.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {regions
                            .find((r) => r.id === activeRegion)
                            ?.countryList.map((country, i) => (
                              <span
                                key={i}
                                className="inline-block px-2 py-1 bg-white/80 rounded-full text-xs text-gray-700"
                              >
                                {country}
                              </span>
                            ))}
                          {regions.find((r) => r.id === activeRegion)?.countries > 6 && (
                            <span className="inline-block px-2 py-1 bg-white/80 rounded-full text-xs text-gray-700">
                              +{regions.find((r) => r.id === activeRegion)?.countries - 6} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats and Info */}
          <div className="lg:w-1/3 w-full">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 blur-sm opacity-70"></div>
                  <div className="relative bg-white rounded-full p-3">
                    <Globe className="h-10 w-10 text-indigo-500" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-indigo-800 ml-4">50+ Countries</h3>
              </div>

              <div className="space-y-4">
                {/* <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">12 countries</span> in Asia
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">15 countries</span> in Europe
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">8 countries</span> in the Americas
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">10 countries</span> in Africa & Middle East
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">5 countries</span> in Oceania
                  </p>
                </div> */}
                {/* Updated UK region */}
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">18 countries</span> in UK & European Regions
                  </p>
                </div>
                {/* Updated MENA region */}
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <p className="text-gray-700">
                    <span className="font-medium">18 countries</span> in the MENA region
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">Why our global network matters:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                      ✓
                    </div>
                    <p className="text-sm text-gray-700">Access to international brand deals</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                      ✓
                    </div>
                    <p className="text-sm text-gray-700">Cross-cultural collaboration opportunities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">
                      ✓
                    </div>
                    <p className="text-sm text-gray-700">Localized support in your region</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

