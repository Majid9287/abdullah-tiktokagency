"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { useModal } from "./modal-context"

export default function JoinModal() {
  const { isModalOpen, closeModal } = useModal()
  const modalRef = useRef(null)

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

          <div className="space-y-4">
            <a
              href="https://www.tiktok.com/t/ZSj2DN58Y/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white rounded-xl text-center font-medium transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              UK Region
              <span className="block text-sm mt-1 text-white/80">Abdullah Agency Joining Link</span>
            </a>

            <a
              href="https://www.tiktok.com/t/ZMBjNBKjd/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full p-4 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white rounded-xl text-center font-medium transition-all transform hover:-translate-y-1 active:translate-y-0 shadow-md hover:shadow-lg"
            >
              MENA Region
              <span className="block text-sm mt-1 text-white/80">Abdullah Agency Joining Link</span>
            </a>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            By joining, you agree to our terms and conditions
          </div>
        </div>
      </div>
    </div>
  )
}

