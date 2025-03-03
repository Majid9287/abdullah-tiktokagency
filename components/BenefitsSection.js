import { Zap, Users, DollarSign, Award, Headphones, BarChart } from "lucide-react"

export default function BenefitsSection() {
  const benefits = [
    {
      icon: <Zap className="h-10 w-10 text-pink-500" />,
      title: "Rapid Growth",
      description: "Accelerate your TikTok growth with proven strategies and expert guidance.",
    },
    {
      icon: <Users className="h-10 w-10 text-pink-500" />,
      title: "Community Support",
      description: "Join a network of like-minded creators who support and inspire each other.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-pink-500" />,
      title: "Monetization",
      description: "Learn effective ways to monetize your content and build a sustainable income.",
    },
    {
      icon: <Award className="h-10 w-10 text-pink-500" />,
      title: "Exclusive Opportunities",
      description: "Get access to brand deals, collaborations, and special events.",
    },
    {
      icon: <Headphones className="h-10 w-10 text-pink-500" />,
      title: "24/7 Mentorship",
      description: "Receive guidance from experienced mentors whenever you need it.",
    },
    {
      icon: <BarChart className="h-10 w-10 text-pink-500" />,
      title: "Analytics & Insights",
      description: "Understand your performance with detailed analytics and actionable insights.",
    },
  ]

  return (
    <section id="benefits" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Why Join Us?</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="card p-6 hover:translate-y-[-5px]">
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-bold mb-2 text-gray-800">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

