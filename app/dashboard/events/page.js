"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash, Calendar, Camera } from "lucide-react"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("upcoming")

  const upcomingEvents = [
    {
      id: 1,
      title: "Creator Summit 2023",
      date: "November 15, 2023",
      time: "10:00 AM - 6:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Live Streaming Masterclass",
      date: "December 5, 2023",
      time: "2:00 PM - 4:00 PM",
      location: "Virtual Event",
      image: "/placeholder.svg?height=200&width=300",
    },
  ]

  const memories = [
    {
      id: 1,
      title: "Summer Creator Camp",
      date: "July 2023",
      type: "image",
      media: "/placeholder.svg?height=200&width=300",
    },
    {
      id: 2,
      title: "Viral Challenge Workshop",
      date: "August 2023",
      type: "image",
      media: "/placeholder.svg?height=200&width=300",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Events & Memories</h1>
        <Link href="/dashboard/events/create" className="btn-primary flex items-center">
          <Plus className="h-4 w-4 mr-1" />
          Create New
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab("upcoming")}
          className={`py-4 px-6 flex items-center ${
            activeTab === "upcoming" ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Calendar className="h-4 w-4 mr-2" />
          Upcoming Events
        </button>
        <button
          onClick={() => setActiveTab("memories")}
          className={`py-4 px-6 flex items-center ${
            activeTab === "memories" ? "border-b-2 border-pink-600 text-pink-600" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Camera className="h-4 w-4 mr-2" />
          Memories
        </button>
      </div>

      {/* Content */}
      {activeTab === "upcoming" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {upcomingEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24 relative">
                        <Image
                          src={event.image || "/placeholder.svg"}
                          alt={event.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{event.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.date}</div>
                    <div className="text-sm text-gray-500">{event.time}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{event.location}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === "memories" && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Memory
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {memories.map((memory) => (
                <tr key={memory.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24 relative">
                        <Image
                          src={memory.media || "/placeholder.svg"}
                          alt={memory.title}
                          fill
                          className="rounded object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{memory.title}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{memory.date}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 capitalize">{memory.type}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

