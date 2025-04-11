"use client"

import { useEffect, useRef, useState } from "react"
import { X } from "lucide-react"
import { useModal } from "./modal-context"

export default function JoinModal() {
  const { isModalOpen, closeModal } = useModal()
  const modalRef = useRef(null)
  const [selectedRegion, setSelectedRegion] = useState("UK")
  
  const regions = {
    UK: {
      name: "UK & European Region",
      countries: [
        "UK",
        "Ireland",
        "Jersey",
        "Isle of Man",
        "Greece",
        "Albania",
        "Lithuania",
        "Serbia",
        "Latvia",
        "Estonia",
        "Macedonia",
        "Bosnia",
        "Malta",
        "Montenegro",
        "Faroe Islands",
        "Gibraltar",
        "Guernsey",
        "Congo"
      ],
      joinLink: "https://www.tiktok.com/t/ZSj2DN58Y/" // UK region link
    },
    MENA: {
      name: "MENA Region",
      countries: [
        "United Arab Emirates",
        "Bahrain",
        "Egypt",
        "Jordan",
        "Saudi Arabia",
        "Morocco",
        "Lebanon",
        "Qatar",
        "Kuwait",
        "Oman",
        "Tunisia",
        "Algeria",
        "Djibouti",
        "Iraq",
        "Comoros",
        "Libya",
        "Mauritania",
        "Palestine"
      ],
      joinLink: "https://www.tiktok.com/t/ZMBjNBKjd/" // MENA region link
    }
  }

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeModal()
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        closeModal()
      }
    }

    if (isModalOpen) {
      document.addEventListener("keydown", handleEscape)
      document.addEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "hidden"
    }

    return () => {
      document.removeEventListener("keydown", handleEscape)
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [isModalOpen, closeModal])

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up"
      >
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-pink-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-400 rounded-full opacity-20"></div>

        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
        >
          <X size={20} className="text-gray-700" />
        </button>

        {/* Modal content */}
        <div className="relative p-6 pt-8">
          <h3 className="text-2xl font-bold text-center text-pink-600 mb-2">Join Abdullah Agency</h3>
          <p className="text-gray-600 text-center mb-6">Select your region to join our TikTok community</p>
          
          {/* Countries grid with vertical divider */}
          <div className="mb-6">
            <div className="flex mb-2">
              <h3 className="text-lg font-semibold flex-1 text-center">MENA Region</h3>
              <h3 className="text-lg font-semibold flex-1 text-center">UK & European Region</h3>
            </div>
            <div className="flex mb-6">
              <div className="flex-1 border-r pr-2">
                <div className="grid gap-y-1 max-h-48 overflow-y-auto p-2">
                  {regions["MENA"].countries.map((country) => (
                    <div key={country} className="flex items-center">
                      <span className="text-sm">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-1 pl-2">
                <div className="grid gap-y-1 max-h-48 overflow-y-auto p-2">
                  {regions["UK"].countries.map((country) => (
                    <div key={country} className="flex items-center">
                      <span className="text-sm">{country}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Join buttons with previous design */}
          <div className="space-y-4">
            <a
              href={regions["UK"].joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-center font-medium transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              UK Region
              <span className="block text-sm mt-1 text-white/80">Abdullah Agency Joining Link</span>
            </a>

            <a
              href={regions["MENA"].joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-center font-medium transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              MENA Region
              <span className="block text-sm mt-1 text-white/80">Abdullah Agency Joining Link</span>
            </a>
          </div>
          
          <div className="mt-6 text-center text-xs text-gray-500">
            <p>By joining, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}