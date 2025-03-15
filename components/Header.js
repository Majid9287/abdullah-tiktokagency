"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      if (offset > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white/70 backdrop-blur-md shadow-lg' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2 relative z-10">
          <div className="relative h-12 w-12">
            <Image
              src="/logo.png?height=40&width=40"
              alt="Abdullah Agency Logo"
              fill
              className="object-contain"
            />
          </div>
          <span className={`font-bold text-xl transition-colors duration-300 ${
            scrolled ? 'text-pink-600' : 'text-white'
          }`}>Abdullah Agency</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {['Home', 'Benefits', 'Mentors', 'Trainers', 'Countries', 'Events'].map((item) => (
            <Link 
              key={item}
              href={item === 'Home' ? '/' : `#${item.toLowerCase()}`} 
              className={`font-medium transition-all duration-300 hover:text-pink-500 ${
                scrolled ? 'text-gray-800' : 'text-white'
              }`}
            >
              {item}
            </Link>
          ))}
          <Link 
            href="/join" 
            className={`px-5 py-2 rounded-full transition-all duration-300 ${
              scrolled 
                ? 'bg-pink-600 text-white hover:bg-pink-700' 
                : 'bg-white/20 backdrop-blur-sm text-white hover:bg-white/30'
            }`}
          >
            Apply Now
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden transition-colors duration-300 ${
            scrolled ? 'text-gray-800' : 'text-white'
          }`} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-md py-4 px-4 shadow-lg animate-fade-in">
          <nav className="flex flex-col space-y-4">
            {['Home', 'Benefits', 'Mentors', 'Trainers', 'Countries', 'Events'].map((item) => (
              <Link
                key={item}
                href={item === 'Home' ? '/' : `#${item.toLowerCase()}`}
                className="text-gray-800 hover:text-pink-600 transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/join"
              className="bg-pink-600 text-white py-3 px-6 rounded-full text-center font-medium hover:bg-pink-700 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Apply Now
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
