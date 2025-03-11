"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Users, Zap, Calendar } from "lucide-react"

export default function TrainersSection() {
  const [activeTrainer, setActiveTrainer] = useState(null)

  const trainers = [
    {
      name: "James Wilson",
      specialty: "Live Performance",
      image: "/mentor1.jpg?height=400&width=300",
      description: "James teaches creators how to captivate audiences during live sessions.",
      gradient: "from-teal-400 to-emerald-400",
      iconGradient: "from-teal-500 to-emerald-500",
      textColor: "text-teal-600",
      icon: <Play className="h-5 w-5" />,
      stats: {
        sessions: "120+",
        students: "1.4K",
        rating: "4.9",
      },
    },
    {
      name: "Emma Rodriguez",
      specialty: "Audience Engagement",
      image: "/hero1.jpg?height=400&width=300",
      description: "Emma specializes in building meaningful connections with viewers.",
      gradient: "from-emerald-400 to-green-400",
      iconGradient: "from-emerald-500 to-green-500",
      textColor: "text-emerald-600",
      icon: <Users className="h-5 w-5" />,
      stats: {
        sessions: "95+",
        students: "2.1K",
        rating: "4.8",
      },
    },
    {
      name: "Raj Mehta",
      specialty: "Technical Setup",
      image: "/placeholder.svg?height=400&width=300",
      description: "Raj helps creators optimize their technical setup for professional streams.",
      gradient: "from-green-400 to-lime-400",
      iconGradient: "from-green-500 to-lime-500",
      textColor: "text-green-600",
      icon: <Zap className="h-5 w-5" />,
      stats: {
        sessions: "150+",
        students: "1.8K",
        rating: "4.7",
      },
    },
    {
      name: "Lisa Wang",
      specialty: "Content Planning",
      image: "/placeholder.svg?height=400&width=300",
      description: "Lisa teaches strategic content planning for maximum impact.",
      gradient: "from-lime-400 to-teal-400",
      iconGradient: "from-lime-500 to-teal-500",
      textColor: "text-lime-600",
      icon: <Calendar className="h-5 w-5" />,
      stats: {
        sessions: "110+",
        students: "1.6K",
        rating: "4.9",
      },
    },
  ]

  return (
    <section id="trainers" className="py-20 relative overflow-hidden">
      {/* Background with gradient overlay
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-100 to-teal-100"></div> */}

      {/* Animated background elements
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-teal-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-teal-500/10 text-teal-600 text-sm font-medium mb-3">
            EXPERT TRAINING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">Meet Our Specialized Trainers</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-teal-900/70 max-w-2xl mx-auto">
            Our trainers provide personalized guidance to help you master every aspect of TikTok live streaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div
              key={index}
              className="group relative"
              onMouseEnter={() => setActiveTrainer(index)}
              onMouseLeave={() => setActiveTrainer(null)}
            >
              {/* Card with hexagonal elements */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-2xl border border-white/50 h-full">
                {/* Hexagonal pattern top accent */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-white to-transparent relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${trainer.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NiIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg2IDQ4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNODUuOTYxIDQwLjk0YTYuOTk3IDYuOTk3IDAgMCAxLTEuMzc3IDIuNDQ2TDQyLjUgMjQuMDAxIDAgNDcuNTg1YTcuMDA1IDcuMDA1IDAgMCAxLTEuMzc2LTIuNDQ3bDQzLjUzOC0yMy42MzdMODUuOTYgNDAuOTM5ek0xLjM3NyA3LjA1MkE2Ljk5NyA2Ljk5NyAwIDAgMSAyLjc1MyA0LjYwNkw0Mi41IDI0LjAwMSA4Mi4yNDcgNC42MDZhNi45OTcgNi45OTcgMCAwIDEgMS4zNzcgMi40NDZMNDIuNSAzMC42OTIgMS4zNzcgNy4wNTJ6TTAgMTUuNDM1YTcuMDAyIDcuMDAyIDAgMCAxIDAtNC44N2w0Mi41IDIzLjE0NCA0Mi41LTIzLjE0NGE3LjAwMiA3LjAwMiAwIDAgMSAwIDQuODdMNDIuNSAzOC41OCAweWV0IGFub3RoZXIgdGVzdCAxNS40MzV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                </div>

                {/* Trainer image with overlay */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={trainer.image || "/placeholder.svg"}
                    alt={trainer.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>

                  {/* Specialty badge */}
                  <div className="absolute top-4 right-4">
                    <div
                      className={`bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1 shadow-md border border-white/50`}
                    >
                      <div className={`${trainer.textColor}`}>{trainer.icon}</div>
                      <span className={`text-xs font-medium ${trainer.textColor}`}>{trainer.specialty}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div className={`h-0.5 w-6 bg-gradient-to-r ${trainer.gradient} mr-2`}></div>
                    <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">{trainer.description}</p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>{trainer.stats.sessions}</p>
                      <p className="text-xs text-gray-500">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>{trainer.stats.students}</p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>{trainer.stats.rating}</p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Book button - appears on hover */}
                <div className="px-5 pb-5">
                  <button
                    className={`w-full py-2 rounded-lg bg-gradient-to-r ${trainer.gradient} text-white text-sm font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 hover:shadow-lg transform group-hover:translate-y-0 translate-y-4`}
                  >
                    Book a Session
                  </button>
                </div>

                {/* Hexagonal pattern bottom accent */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-white to-transparent relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-r ${trainer.gradient} opacity-80`}></div>
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4NiIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDg2IDQ4Ij48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4zIj48cGF0aCBkPSJNODUuOTYxIDQwLjk0YTYuOTk3IDYuOTk3IDAgMCAxLTEuMzc3IDIuNDQ2TDQyLjUgMjQuMDAxIDAgNDcuNTg1YTcuMDA1IDcuMDA1IDAgMCAxLTEuMzc2LTIuNDQ3bDQzLjUzOC0yMy42MzdMODUuOTYgNDAuOTM5ek0xLjM3NyA3LjA1MkE2Ljk5NyA2Ljk5NyAwIDAgMSAyLjc1MyA0LjYwNkw0Mi41IDI0LjAwMSA4Mi4yNDcgNC42MDZhNi45OTcgNi45OTcgMCAwIDEgMS4zNzcgMi40NDZMNDIuNSAzMC42OTIgMS4zNzcgNy4wNTJ6TTAgMTUuNDM1YTcuMDAyIDcuMDAyIDAgMCAxIDAtNC44N2w0Mi41IDIzLjE0NCA0Mi41LTIzLjE0NGE3LjAwMiA3LjAwMiAwIDAgMSAwIDQuODdMNDIuNSAzOC41OCAweWV0IGFub3RoZXIgdGVzdCAxNS40MzV6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                </div>
              </div>

              {/* Animated corner accent */}
              <div className="absolute bottom-0 right-0 w-12 h-12 overflow-hidden">
                <div
                  className={`absolute bottom-0 right-0 w-6 h-6 translate-x-1/2 translate-y-1/2 bg-gradient-to-tl ${trainer.iconGradient} rounded-tl-xl opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500`}
                ></div>
              </div>

              {/* Hover glow effect */}
              {activeTrainer === index && (
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${trainer.gradient} rounded-2xl blur-sm opacity-30 -z-10`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-white/50 shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-teal-800 mb-3">Ready to elevate your TikTok skills?</h3>
            <p className="text-gray-700 mb-6">
              Our trainers offer both group workshops and one-on-one coaching sessions tailored to your specific needs.
            </p>
            <button className="px-8 py-3 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-medium hover:from-teal-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 active:translate-y-0">
              Schedule Training
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

