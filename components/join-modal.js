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
      joinLink: "https://www.tiktok.com/t/mena-link/" // Replace with actual MENA region link
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
          <h2 className="text-2xl font-bold text-center mb-6">Join Our Community</h2>
          
          {/* Region selection tabs */}
          <div className="flex mb-6 border-b">
            {Object.keys(regions).map((region) => (
              <button
                key={region}
                className={`px-4 py-2 font-medium ${
                  selectedRegion === region
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500 hover:text-purple-600"
                }`}
                onClick={() => setSelectedRegion(region)}
              >
                {regions[region].name}
              </button>
            ))}
          </div>
          
          {/* Countries grid */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Available Countries</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-2 max-h-60 overflow-y-auto p-2">
              {regions[selectedRegion].countries.map((country) => (
                <div key={country} className="flex items-center">
                  <span className="text-sm">{country}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="text-center text-sm text-gray-600 mb-4">
            <p>Select your region above to continue</p>
          </div>
          
          {/* Join button */}
          <div className="flex justify-center">
            <a
              href={regions[selectedRegion].joinLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              Join {regions[selectedRegion].name}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
          
          <div className="mt-4 text-center text-xs text-gray-500">
            <p>By joining, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </div>
      </div>
    </div>
  )
}

