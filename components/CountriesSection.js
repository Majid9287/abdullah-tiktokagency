"use client"

import { useState, useEffect } from "react"
import { Globe, MapPin } from 'lucide-react'
import Image from "next/image"

export default function CountriesSection() {
  const [hoveredRegion, setHoveredRegion] = useState(null)
  const [activeRegion, setActiveRegion] = useState(null)

  // Auto-cycle through regions when none is hovered
  useEffect(() => {
    if (hoveredRegion === null) {
      const interval = setInterval(() => {
        setActiveRegion(prev => {
          const nextIndex = regions.findIndex(r => r.id === prev) + 1;
          return regions[nextIndex % regions.length]?.id || regions[0].id;
        });
      }, 3000);
      return () => clearInterval(interval);
    } else {
      setActiveRegion(hoveredRegion);
    }
  }, [hoveredRegion]);

  const regions = [
    {
      id: "asia",
      name: "Asia",
      countries: 12,
      description: "Covering major markets including Japan, South Korea, India, and Southeast Asia",
      gradient: "from-pink-400 to-purple-400",
      iconGradient: "from-pink-500 to-purple-500",
      textColor: "text-pink-600",
      position: { top: "25%", left: "70%" },
      countryList: ["Japan", "South Korea", "China", "India", "Thailand", "Vietnam"]
    },
    {
      id: "europe",
      name: "Europe",
      countries: 15,
      description: "Strong presence across Western and Eastern European countries",
      gradient: "from-purple-400 to-indigo-400",
      iconGradient: "from-purple-500 to-indigo-500",
      textColor: "text-purple-600",
      position: { top: "25%", left: "48%" },
      countryList: ["UK", "France", "Germany", "Italy", "Spain", "Netherlands"]
    },
    {
      id: "americas",
      name: "Americas",
      countries: 8,
      description: "From Canada to Argentina, covering North and South America",
      gradient: "from-indigo-400 to-blue-400",
      iconGradient: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
      position: { top: "35%", left: "25%" },
      countryList: ["USA", "Canada", "Brazil", "Mexico", "Argentina", "Colombia"]
    },
    {
      id: "africa",
      name: "Africa & Middle East",
      countries: 10,
      description: "Growing presence in emerging markets across Africa and the Middle East",
      gradient: "from-blue-400 to-cyan-400",
      iconGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      position: { top: "45%", left: "52%" },
      countryList: ["UAE", "South Africa", "Egypt", "Nigeria", "Kenya", "Saudi Arabia"]
    },
    {
      id: "oceania",
      name: "Oceania",
      countries: 5,
      description: "Australia, New Zealand and Pacific Island nations",
      gradient: "from-cyan-400 to-teal-400",
      iconGradient: "from-cyan-500 to-teal-500",
      textColor: "text-cyan-600",
      position: { top: "65%", left: "80%" },
      countryList: ["Australia", "New Zealand", "Fiji", "Papua New Guinea", "Solomon Islands"]
    },
  ]

  return (
    <section id="countries" className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-100 to-cyan-100"></div>
       */}
      {/* Animated background elements
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div> */}

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
                <Image 
                  src="/map.jpg?height=400&width=800" 
                  alt="World Map" 
                  fill 
                  className="object-cover opacity-40" 
                />
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
                    <div className={`absolute -inset-4 rounded-full bg-gradient-to-r ${region.gradient} opacity-30 group-hover:opacity-50 animate-ping-slow`}></div>
                    
                    {/* Pin */}
                    <div className={`relative w-8 h-8 rounded-full bg-gradient-to-r ${region.gradient} flex items-center justify-center shadow-lg transform transition-transform duration-300 ${activeRegion === region.id ? 'scale-125' : 'scale-100'}`}>
                      <MapPin className="h-4 w-4 text-white" />
                    </div>
                    
                    {/* Connection line to info card - only visible when active */}
                    {activeRegion === region.id && (
                      <div className={`absolute w-px h-16 bg-gradient-to-b ${region.gradient} left-1/2 transform -translate-x-1/2`} style={{
                        top: '100%',
                      }}></div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Active Region Information Card */}
              {activeRegion && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-md animate-fade-in">
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-white/50">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${regions.find(r => r.id === activeRegion)?.gradient} flex items-center justify-center text-white font-bold shrink-0`}>
                        {regions.find(r => r.id === activeRegion)?.name.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h4 className={`text-lg font-bold ${regions.find(r => r.id === activeRegion)?.textColor}`}>
                          {regions.find(r => r.id === activeRegion)?.name}
                        </h4>
                        <p className="text-sm text-gray-700 mb-2">
                          {regions.find(r => r.id === activeRegion)?.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {regions.find(r => r.id === activeRegion)?.countryList.map((country, i) => (
                            <span key={i} className="inline-block px-2 py-1 bg-white/80 rounded-full text-xs text-gray-700">
                              {country}
                            </span>
                          ))}
                          {regions.find(r => r.id === activeRegion)?.countries > 6 && (
                            <span className="inline-block px-2 py-1 bg-white/80 rounded-full text-xs text-gray-700">
                              +{regions.find(r => r.id === activeRegion)?.countries - 6} more
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
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-pink-500 mr-2"></div>
                  <p className="text-gray-700"><span className="font-medium">12 countries</span> in Asia</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <p className="text-gray-700"><span className="font-medium">15 countries</span> in Europe</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-indigo-500 mr-2"></div>
                  <p className="text-gray-700"><span className="font-medium">8 countries</span> in the Americas</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <p className="text-gray-700"><span className="font-medium">10 countries</span> in Africa & Middle East</p>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 mr-2"></div>
                  <p className="text-gray-700"><span className="font-medium">5 countries</span> in Oceania</p>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h4 className="font-bold text-gray-800 mb-2">Why our global network matters:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</div>
                    <p className="text-sm text-gray-700">Access to international brand deals</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</div>
                    <p className="text-sm text-gray-700">Cross-cultural collaboration opportunities</p>
                  </li>
                  <li className="flex items-start">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center justify-center text-white text-xs mr-2 mt-0.5">✓</div>
                    <p className="text-sm text-gray-700">Localized support in your region</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <p className="text-indigo-900/70 mb-4">Dont see your country? Were constantly expanding!</p>
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-medium hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
            Check Eligibility
          </button>
        </div>
      </div>
    </section>
  )
}
