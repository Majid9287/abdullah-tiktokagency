"use client"

import { useState, useEffect, useRef } from "react"
import { User, Menu } from "lucide-react"
import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export default function DashboardNavbar() {
  const { data: session } = useSession()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Breadcrumb/Title */}
        <div className="flex items-center space-x-4">
          <h1 className="text-lg md:text-xl font-semibold text-gray-800">
            Dashboard
          </h1>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center space-x-3">
          {/* Profile Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
              <span className="hidden md:block text-sm font-medium">
                {session?.user?.name || 'Admin'}
              </span>
            </button>

            {/* Profile Dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="text-sm font-medium text-gray-900">
                    {session?.user?.name || 'Admin User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {session?.user?.email || 'admin@abdullahagency.com'}
                  </p>
                </div>
                <Link
                  href="/"
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setShowProfileMenu(false)}
                >
                  Website Home
                </Link>
                <div className="border-t border-gray-200 my-1"></div>
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    signOut({ callbackUrl: '/auth/login' });
                  }}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
