import { Users, Calendar, Globe, Award } from "lucide-react"

export default function DashboardStats() {
  const stats = [
    {
      title: "Total Mentors",
      value: "12",
      icon: <Users className="h-8 w-8 text-pink-600" />,
      change: "+2 this month",
    },
    {
      title: "Total Trainers",
      value: "8",
      icon: <Award className="h-8 w-8 text-pink-600" />,
      change: "+1 this month",
    },
    {
      title: "Active Members",
      value: "1,248",
      icon: <Users className="h-8 w-8 text-pink-600" />,
      change: "+156 this month",
    },
    {
      title: "Upcoming Events",
      value: "5",
      icon: <Calendar className="h-8 w-8 text-pink-600" />,
      change: "Next: Nov 15",
    },
    {
      title: "Supported Countries",
      value: "42",
      icon: <Globe className="h-8 w-8 text-pink-600" />,
      change: "+3 this month",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
            </div>
            <div>{stat.icon}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

