"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Abdullah Agency Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="font-bold text-xl text-pink-600">Abdullah Agency</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link href="/" className="text-gray-700 hover:text-pink-600 transition-colors">
            Home
          </Link>
          <Link href="#benefits" className="text-gray-700 hover:text-pink-600 transition-colors">
            Benefits
          </Link>
          <Link href="#mentors" className="text-gray-700 hover:text-pink-600 transition-colors">
            Mentors
          </Link>
          <Link href="#trainers" className="text-gray-700 hover:text-pink-600 transition-colors">
            Trainers
          </Link>
          <Link href="#countries" className="text-gray-700 hover:text-pink-600 transition-colors">
            Countries
          </Link>
          <Link href="#events" className="text-gray-700 hover:text-pink-600 transition-colors">
            Events
          </Link>
        </nav>

        {/* <div className="hidden md:block">
          <Link href="/dashboard" className="btn-secondary">
            Dashboard
          </Link>
        </div> */}

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="#benefits"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Benefits
            </Link>
            <Link
              href="#mentors"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Mentors
            </Link>
            <Link
              href="#trainers"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Trainers
            </Link>
            <Link
              href="#countries"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Countries
            </Link>
            <Link
              href="#events"
              className="text-gray-700 hover:text-pink-600 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            {/* <Link
              href="/dashboard"
              className="btn-secondary inline-block text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link> */}
          </nav>
        </div>
      )}
    </header>
  )
}

