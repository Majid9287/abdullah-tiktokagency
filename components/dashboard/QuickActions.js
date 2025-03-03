import Link from "next/link"
import { UserPlus, CalendarPlus, GlobeIcon as GlobeCheck, Upload } from "lucide-react"

export default function QuickActions() {
  const actions = [
    {
      title: "Add New Mentor",
      description: "Add a new mentor to the agency",
      icon: <UserPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/people/add-mentor",
    },
    {
      title: "Add New Trainer",
      description: "Add a new trainer to the agency",
      icon: <UserPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/people/add-trainer",
    },
    {
      title: "Create Event",
      description: "Schedule a new event or memory",
      icon: <CalendarPlus className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/events/create",
    },
    {
      title: "Update Countries",
      description: "Manage supported countries",
      icon: <GlobeCheck className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/countries",
    },
    {
      title: "Upload Media",
      description: "Add new images or videos",
      icon: <Upload className="h-6 w-6 text-pink-600" />,
      href: "/dashboard/media/upload",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
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

