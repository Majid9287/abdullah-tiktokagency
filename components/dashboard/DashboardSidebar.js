"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Home, Users, Calendar, Globe, ImageIcon, Settings, LogOut, Menu, X } from "lucide-react"

export default function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)

  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/dashboard" },
    { icon: Users, label: "Mentors & Trainers", href: "/dashboard/people" },
    { icon: Calendar, label: "Events & Memories", href: "/dashboard/events" },
    { icon: Globe, label: "Countries", href: "/dashboard/countries" },
    { icon: ImageIcon, label: "Media Library", href: "/dashboard/media" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button
        className="fixed top-4 left-4 z-50 md:hidden bg-white p-2 rounded-md shadow-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:translate-x-0
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-20 border-b">
            <Link href="/" className="flex items-center space-x-2">
              <div className="relative h-8 w-8">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Abdullah Agency Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-xl text-pink-600">Abdullah Agency</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4 px-3">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.href}
                    className="flex items-center p-3 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10 rounded-full overflow-hidden">
                <Image src="/placeholder.svg?height=40&width=40" alt="Admin User" fill className="object-cover" />
              </div>
              <div>
                <p className="font-medium text-gray-800">Admin User</p>
                <p className="text-xs text-gray-500">admin@abdullahagency.com</p>
              </div>
            </div>

            <button className="mt-4 flex items-center w-full p-2 text-gray-700 rounded-lg hover:bg-pink-50 hover:text-pink-600 transition-colors">
              <LogOut className="h-5 w-5 mr-3" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}

