"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, Users, Zap, Calendar } from "lucide-react";

export default function TrainersSection() {
  const [activeTrainer, setActiveTrainer] = useState(null);

  const trainers = [
    {
      name: "James Wilson",
      specialty: "Live Performance",
      image: "/mentor1.jpg?height=400&width=300",
      description:
        "James teaches creators how to captivate audiences during live sessions.",
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
      description:
        "Emma specializes in building meaningful connections with viewers.",
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
      description:
        "Raj helps creators optimize their technical setup for professional streams.",
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
      description:
        "Lisa teaches strategic content planning for maximum impact.",
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
  ];

  return (
    <section id="trainers" className="py-20 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-green-200 rounded-full opacity-20 animate-pulse"></div>
        <div
          className="absolute top-20 right-20 w-60 h-60 bg-green-300 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-10 left-1/4 w-40 h-40 bg-green-100 rounded-full opacity-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>

        {/* Additional floating elements */}
        <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-white rounded-full opacity-10 animate-float"></div>
        <div className="absolute top-2/3 right-1/4 w-32 h-32 bg-white rounded-full opacity-10 animate-float-delayed"></div>

        {/* Light rays */}
        <div className="absolute top-0 left-1/2 w-1/2 h-screen bg-gradient-to-b from-green-200/20 to-transparent transform -translate-x-1/2 rotate-15 opacity-30"></div>
        <div className="absolute top-0 right-0 w-1/3 h-screen bg-gradient-to-b from-green-300/20 to-transparent transform -rotate-15 opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-4 rounded-full bg-teal-500/10 text-teal-600 text-sm font-medium mb-3">
            EXPERT TRAINING
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-teal-800 mb-4">
            Meet Our Specialized Trainers
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-teal-500 to-emerald-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-teal-900/70 max-w-2xl mx-auto">
            Our trainers provide personalized guidance to help you master every
            aspect of TikTok live streaming.
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
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${trainer.gradient} opacity-80`}
                  ></div>
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
                      <div className={`${trainer.textColor}`}>
                        {trainer.icon}
                      </div>
                      <span
                        className={`text-xs font-medium ${trainer.textColor}`}
                      >
                        {trainer.specialty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center mb-3">
                    <div
                      className={`h-0.5 w-6 bg-gradient-to-r ${trainer.gradient} mr-2`}
                    ></div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {trainer.name}
                    </h3>
                  </div>

                  <p className="text-gray-600 text-sm mb-4">
                    {trainer.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>
                        {trainer.stats.sessions}
                      </p>
                      <p className="text-xs text-gray-500">Sessions</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>
                        {trainer.stats.students}
                      </p>
                      <p className="text-xs text-gray-500">Students</p>
                    </div>
                    <div className="text-center">
                      <p className={`text-lg font-bold ${trainer.textColor}`}>
                        {trainer.stats.rating}
                      </p>
                      <p className="text-xs text-gray-500">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Hexagonal pattern bottom accent */}
                <div className="h-2 w-full bg-gradient-to-r from-transparent via-white to-transparent relative overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${trainer.gradient} opacity-80`}
                  ></div>
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
      </div>
    </section>
  );
}
