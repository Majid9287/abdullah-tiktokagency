"use client"

import Link from "next/link"
import { UserPlus, CalendarPlus, Users } from "lucide-react"
import { useSession } from "next-auth/react"

export default function QuickActions() {
  const { data: session } = useSession()

  const allActions = [
    {
      title: "Add New Mentor",
      description: "Add a new mentor to the agency",
      icon: <UserPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/people/add-mentor",
    },
    {
      title: "Create Event",
      description: "Add new event or memory with image/video",
      icon: <CalendarPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/events",
    },
    {
      title: "Create User",
      description: "Add a new user account",
      icon: <UserPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/users",
      requiresSystemAdmin: true,
    },
    {
      title: "View Users",
      description: "Manage user accounts",
      icon: <Users className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/users",
      requiresSystemAdmin: true,
    },
  ]

  const actions = allActions.filter(action =>
    !action.requiresSystemAdmin || session?.user?.isSystemAdmin
  );

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {actions.map((action, index) => (
          <Link
            key={index}
            href={action.href}
            className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex flex-col items-center text-center">
              <div className="mb-3">{action.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-1">{action.title}</h3>
              <p className="text-xs text-gray-500">{action.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

