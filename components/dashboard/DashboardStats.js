"use client"

import { useEffect, useState } from "react"
import { Users, Calendar, Award, TrendingUp } from "lucide-react"

export default function DashboardStats() {
  const [stats, setStats] = useState({
    mentors: 0,
    events: 0,
    users: 0,
    admins: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [mentorsRes, eventsRes, usersRes] = await Promise.all([
          fetch('/api/dashboard/stats/mentors'),
          fetch('/api/dashboard/stats/events'),
          fetch('/api/dashboard/stats/users'),
        ])

        const mentorsData = await mentorsRes.json()
        const eventsData = await eventsRes.json()
        const usersData = await usersRes.json()

        setStats({
          mentors: mentorsData.count || 0,
          events: eventsData.count || 0,
          users: usersData.total || 0,
          admins: usersData.admins || 0,
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      title: "Total Mentors",
      value: loading ? "..." : stats.mentors.toString(),
      icon: <Award className="h-8 w-8 text-blue-600" />,
      change: "Active team members",
      color: "bg-blue-50",
    },
    {
      title: "Events & Memories",
      value: loading ? "..." : stats.events.toString(),
      icon: <Calendar className="h-8 w-8 text-green-600" />,
      change: "Video content",
      color: "bg-green-50",
    },
    {
      title: "Total Users",
      value: loading ? "..." : stats.users.toString(),
      icon: <Users className="h-8 w-8 text-purple-600" />,
      change: "Registered users",
      color: "bg-purple-50",
    },
    {
      title: "Admin Users",
      value: loading ? "..." : stats.admins.toString(),
      icon: <TrendingUp className="h-8 w-8 text-orange-600" />,
      change: "System administrators",
      color: "bg-orange-50",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-xs text-gray-500">{stat.change}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

