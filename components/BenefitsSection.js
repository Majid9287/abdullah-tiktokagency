"use client"

import { useState } from "react"
import { Zap, Users, DollarSign, Award, Headphones, BarChart } from "lucide-react"

export default function BenefitsSection() {
  const [hoveredCard, setHoveredCard] = useState(null)

  const benefits = [
    {
      icon: <Zap className="h-10 w-10" />,
      title: "Rapid Growth",
      description: "Accelerate your TikTok growth with proven strategies and expert guidance.",
      gradient: "from-pink-400 to-purple-400",
      iconGradient: "from-pink-500 to-purple-500",
      textColor: "text-pink-600",
    },
    {
      icon: <Users className="h-10 w-10" />,
      title: "Community Support",
      description: "Join a network of like-minded creators who support and inspire each other.",
      gradient: "from-purple-400 to-indigo-400",
      iconGradient: "from-purple-500 to-indigo-500",
      textColor: "text-purple-600",
    },
    {
      icon: <DollarSign className="h-10 w-10" />,
      title: "Monetization",
      description: "Learn effective ways to monetize your content and build a sustainable income.",
      gradient: "from-indigo-400 to-blue-400",
      iconGradient: "from-indigo-500 to-blue-500",
      textColor: "text-indigo-600",
    },
    {
      icon: <Award className="h-10 w-10" />,
      title: "Exclusive Opportunities",
      description: "Get access to brand deals, collaborations, and special events.",
      gradient: "from-blue-400 to-cyan-400",
      iconGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
    },
    {
      icon: <Headphones className="h-10 w-10" />,
      title: "24/7 Mentorship",
      description: "Receive guidance from experienced mentors whenever you need it.",
      gradient: "from-cyan-400 to-teal-400",
      iconGradient: "from-cyan-500 to-teal-500",
      textColor: "text-cyan-600",
    },
    {
      icon: <BarChart className="h-10 w-10" />,
      title: "Analytics & Insights",
      description: "Understand your performance with detailed analytics and actionable insights.",
      gradient: "from-teal-400 to-pink-400",
      iconGradient: "from-teal-500 to-pink-500",
      textColor: "text-teal-600",
    },
  ]

  return (
    <section id="benefits" className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-pink-100 to-purple-100"></div> */}

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
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-pink-500/10 text-pink-600 text-sm font-medium mb-3">
            EXCLUSIVE BENEFITS
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-pink-800 mb-4">Why Join Our Agency?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-pink-900/70 max-w-2xl mx-auto">
            Unlock your full potential as a TikTok creator with our comprehensive suite of benefits and support systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="relative group"
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              

              {/* Card content */}
              <div className="relative flex flex-col h-full bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/50 shadow-xl transition-all duration-500 group-hover:bg-white/90">
               

                <h3
                  className={`text-xl font-bold mb-3 ${benefit.textColor} group-hover:text-pink-600 transition-colors duration-300`}
                >
                  {benefit.title}
                </h3>

                <p className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                  {benefit.description}
                </p>

                {/* Animated corner accent */}
                <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                  <div
                    className={`absolute bottom-0 right-0 w-6 h-6 translate-x-1/2 translate-y-1/2 bg-gradient-to-tl ${benefit.iconGradient} rounded-tl-xl opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                  ></div>
                </div>

                {/* Hover light effect */}
                {hoveredCard === index && (
                  <div className="absolute -inset-px bg-white/40 rounded-2xl animate-pulse-fast pointer-events-none"></div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button className="px-8 py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-medium hover:from-pink-600 hover:to-purple-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  )
}

