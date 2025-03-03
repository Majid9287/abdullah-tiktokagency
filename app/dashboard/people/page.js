import Link from "next/link"
import Image from "next/image"
import { Plus, Edit, Trash } from "lucide-react"

export default function PeoplePage() {
  const mentors = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Lead Mentor",
      image: "/placeholder.svg?height=100&width=100",
      socialMedia: {
        tiktok: "@sarahjohnson",
        instagram: "@sarah.johnson",
      },
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Growth Specialist",
      image: "/placeholder.svg?height=100&width=100",
      socialMedia: {
        tiktok: "@michaelchen",
        instagram: "@michael.chen",
      },
    },
  ]

  const trainers = [
    {
      id: 1,
      name: "James Wilson",
      specialty: "Live Performance",
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: 2,
      name: "Emma Rodriguez",
      specialty: "Audience Engagement",
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Mentors & Trainers</h1>
        <div className="flex space-x-2">
          <Link href="/dashboard/people/add-mentor" className="btn-primary flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Mentor
          </Link>
          <Link href="/dashboard/people/add-trainer" className="btn-secondary flex items-center">
            <Plus className="h-4 w-4 mr-1" />
            Add Trainer
          </Link>
        </div>
      </div>

      {/* Mentors Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Mentors</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mentor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Social Media
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {mentors.map((mentor) => (
                <tr key={mentor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={mentor.image || "/placeholder.svg"}
                          alt={mentor.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{mentor.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{mentor.role}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{mentor.socialMedia.tiktok}</div>
                    <div className="text-sm text-gray-500">{mentor.socialMedia.instagram}</div>
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
      </div>

      {/* Trainers Section */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 mb-4">Trainers</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trainer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specialty
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trainers.map((trainer) => (
                <tr key={trainer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 relative">
                        <Image
                          src={trainer.image || "/placeholder.svg"}
                          alt={trainer.name}
                          fill
                          className="rounded-full object-cover"
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{trainer.name}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{trainer.specialty}</div>
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
      </div>
    </div>
  )
}

