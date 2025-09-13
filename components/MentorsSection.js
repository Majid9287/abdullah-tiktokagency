"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TiktokIcon, InstagramIcon } from "./social-icons";
import Head from 'next/head'

export default function MentorsSection() {
  const [activeCard, setActiveCard] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch mentors from API
  useEffect(() => {
    // Predefined gradient and color combinations
    const colorCombinations = [
      {
        gradient: "from-pink-400 to-purple-400",
        iconGradient: "from-pink-500 to-purple-500",
        textColor: "text-pink-600",
      },
      {
        gradient: "from-purple-400 to-indigo-400",
        iconGradient: "from-purple-500 to-indigo-500",
        textColor: "text-purple-600",
      },
      {
        gradient: "from-blue-400 to-cyan-400",
        iconGradient: "from-blue-500 to-cyan-500",
        textColor: "text-blue-600",
      },
      {
        gradient: "from-indigo-400 to-blue-400",
        iconGradient: "from-indigo-500 to-blue-500",
        textColor: "text-indigo-600",
      },
      {
        gradient: "from-cyan-400 to-teal-400",
        iconGradient: "from-cyan-500 to-teal-500",
        textColor: "text-cyan-600",
      },
      {
        gradient: "from-teal-400 to-green-400",
        iconGradient: "from-teal-500 to-green-500",
        textColor: "text-teal-600",
      },
      {
        gradient: "from-green-400 to-emerald-400",
        iconGradient: "from-green-500 to-emerald-500",
        textColor: "text-green-600",
      },
      {
        gradient: "from-emerald-400 to-lime-400",
        iconGradient: "from-emerald-500 to-lime-500",
        textColor: "text-emerald-600",
      },
      {
        gradient: "from-orange-400 to-red-400",
        iconGradient: "from-orange-500 to-red-500",
        textColor: "text-orange-600",
      },
      {
        gradient: "from-red-400 to-pink-400",
        iconGradient: "from-red-500 to-pink-500",
        textColor: "text-red-600",
      },
    ];

    // Function to get random color combination
    const getRandomColorCombination = (index) => {
      return colorCombinations[index % colorCombinations.length];
    };

    // Function to format availability
    const formatAvailability = (availability) => {
      if (!availability || availability.length === 0) return "Schedule TBD";
      
      return availability
        .filter(slot => slot.isActive)
        .map(slot => `${slot.day.charAt(0).toUpperCase() + slot.day.slice(1)}: ${slot.timeRange}`)
        .join('\n');
    };

    const fetchMentors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/mentors');
        const data = await response.json();
        
        if (data.mentors) {
          // Add color combinations to each mentor
          const mentorsWithColors = data.mentors.map((mentor, index) => ({
            ...mentor,
            ...getRandomColorCombination(index),
            description: formatAvailability(mentor.availability),
            role: mentor.title, // Map title to role for consistency
          }));
          setMentors(mentorsWithColors);
        }
      } catch (error) {
        console.error('Error fetching mentors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentors();
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": mentors.map((mentor, index) => ({
      "@type": "Person",
      "position": index + 1,
      "name": mentor.name,
      "jobTitle": mentor.title,
      "image": `https://your-domain.com${mentor.image}`,
      "description": mentor.bio
    }))
  }

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>
      <section id="mentors" className="py-20 relative overflow-hidden">
        
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

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-4 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium mb-3">
              EXPERT GUIDANCE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-purple-800 mb-4">
              Meet Our Live Mentors
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 mx-auto rounded-full"></div>
            <p className="mt-6 text-lg text-purple-900/70 max-w-2xl mx-auto">
              Learn from industry professionals who have mastered the art of
              TikTok content creation and growth.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
            </div>
          ) : (
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

                    {/* Colored accent top bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${mentor.gradient}`}
                    ></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6">
                      {/* Top section - Social media */}
                      <div className="flex justify-end space-x-2">
                        {/* <a
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
                        </a> */}
                      </div>

                      {/* Bottom section - Mentor info */}
                      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 transform transition-all duration-500 group-hover:translate-y-0">
                        

                        {/* Name and role */}
                        <h3 className="text-xl font-bold text-gray-800">
                          {mentor.name}
                        </h3>
                        <div className="flex items-center mb-2">
                          <div
                            className={`h-0.5 w-6 bg-gradient-to-r ${mentor.gradient} mr-2`}
                          ></div>
                          <p
                            className={`text-sm font-medium ${mentor.textColor}`}
                          >
                            {mentor.title}
                          </p>
                        </div>

                        {/* Description - Only visible on hover */}
                        <div
                          className={`overflow-hidden transition-all duration-500 ${
                            activeCard === index
                              ? "max-h-32 opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <p className="text-gray-700 text-sm whitespace-pre-line">
                            {mentor.description}
                          </p>
                        </div>
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
          )}
        </div>
      </section>
    </>
  );
}
