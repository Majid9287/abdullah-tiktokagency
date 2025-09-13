"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import {
  Home,
  Users,
  Calendar,
  LogOut,
  Menu,
  X,
  Activity,
  Globe
} from "lucide-react"
import { useSession, signOut } from "next-auth/react"

export default function DashboardSidebar() {
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Mentors", href: "/dashboard/mentors" },
    { icon: Calendar, label: "Events", href: "/dashboard/events" },
    { icon: Activity, label: "Activities", href: "/dashboard/activities" },
    ...(session?.user?.isSystemAdmin ? [{ icon: Users, label: "Users", href: "/dashboard/users" }] : []),
  ]

  const isActive = (href) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
      >
        {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-gray-200 shadow-sm transition-transform duration-300 ease-in-out
        ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-18 px-4  border-gray-200">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-10 w-10">
                <Image
                  src="/logo.png"
                  alt="Abdullah Agency Logo"
                  fill
                  className="object-contain rounded-full"
                />
              </div>
              <span className="font-bold text-lg text-pink-600">
                Abdullah Agency
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={`
                      flex items-center px-3 py-3 rounded-lg transition-all duration-200 group
                      ${isActive(item.href)
                        ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                      }
                    `}
                    onClick={() => setIsMobileOpen(false)}
                  >
                    <item.icon
                      className={`h-5 w-5 mr-3 flex-shrink-0 ${
                        isActive(item.href) ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-700'
                      }`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center space-x-3 mb-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">
                  {session?.user?.name?.charAt(0)?.toUpperCase() || 'A'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-800 truncate">
                  {session?.user?.name || 'Admin User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {session?.user?.email || 'admin@abdullahagency.com'}
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors mb-2"
            >
              <Globe className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="font-medium">Website Home</span>
            </Link>
            <button
              onClick={() => signOut({ callbackUrl: '/auth/login' })}
              className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="h-5 w-5 mr-3 flex-shrink-0" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

