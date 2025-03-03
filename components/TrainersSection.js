import Image from "next/image"

export default function TrainersSection() {
  const trainers = [
    {
      name: "James Wilson",
      specialty: "Live Performance",
      image: "/placeholder.svg?height=300&width=300",
      description: "James teaches creators how to captivate audiences during live sessions.",
    },
    {
      name: "Emma Rodriguez",
      specialty: "Audience Engagement",
      image: "/placeholder.svg?height=300&width=300",
      description: "Emma specializes in building meaningful connections with viewers.",
    },
    {
      name: "Raj Mehta",
      specialty: "Technical Setup",
      image: "/placeholder.svg?height=300&width=300",
      description: "Raj helps creators optimize their technical setup for professional streams.",
    },
    {
      name: "Lisa Wang",
      specialty: "Content Planning",
      image: "/placeholder.svg?height=300&width=300",
      description: "Lisa teaches strategic content planning for maximum impact.",
    },
  ]

  return (
    <section id="trainers" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Expert Trainers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trainers.map((trainer, index) => (
            <div key={index} className="card hover:shadow-pink-100">
              <div className="relative h-64 w-full overflow-hidden bg-pink-100">
                <Image src={trainer.image || "/placeholder.svg"} alt={trainer.name} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800">{trainer.name}</h3>
                <p className="text-pink-600 font-medium mb-2">{trainer.specialty}</p>
                <p className="text-gray-600 text-sm">{trainer.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

