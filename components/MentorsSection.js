import Image from "next/image"

export default function MentorsSection() {
  const mentors = [
    {
      name: "Sarah Johnson",
      role: "Lead Mentor",
      image: "/placeholder.svg?height=300&width=300",
      description: "With over 5M followers, Sarah specializes in lifestyle content and engagement strategies.",
      socialMedia: {
        tiktok: "@sarahjohnson",
        instagram: "@sarah.johnson",
      },
    },
    {
      name: "Michael Chen",
      role: "Growth Specialist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Michael has helped over 100 creators reach 1M+ followers with his unique growth tactics.",
      socialMedia: {
        tiktok: "@michaelchen",
        instagram: "@michael.chen",
      },
    },
    {
      name: "Aisha Patel",
      role: "Content Strategist",
      image: "/placeholder.svg?height=300&width=300",
      description: "Aisha is known for creating viral content that resonates with diverse audiences.",
      socialMedia: {
        tiktok: "@aishapatel",
        instagram: "@aisha.patel",
      },
    },
    {
      name: "David Kim",
      role: "Monetization Expert",
      image: "/placeholder.svg?height=300&width=300",
      description: "David specializes in helping creators turn their passion into a sustainable income.",
      socialMedia: {
        tiktok: "@davidkim",
        instagram: "@david.kim",
      },
    },
  ]

  return (
    <section id="mentors" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Meet Our Live Mentors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {mentors.map((mentor, index) => (
            <div key={index} className="card group">
              <div className="relative h-64 w-full overflow-hidden">
                <Image
                  src={mentor.image || "/placeholder.svg"}
                  alt={mentor.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <p className="text-white text-sm">{mentor.socialMedia.tiktok}</p>
                  <p className="text-white text-sm">{mentor.socialMedia.instagram}</p>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{mentor.name}</h3>
                <p className="text-pink-600 font-medium mb-2">{mentor.role}</p>
                <p className="text-gray-600 text-sm">{mentor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

