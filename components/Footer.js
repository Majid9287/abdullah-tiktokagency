import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Abdullah Agency</h3>
            <p className="text-gray-400">
              The premier TikTok Live Agency helping creators grow their presence and monetize their content.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/login" className="text-gray-400 hover:text-white transition-colors">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="#benefits" className="text-gray-400 hover:text-white transition-colors">
                  Benefits
                </Link>
              </li>
              <li>
                <Link href="#mentors" className="text-gray-400 hover:text-white transition-colors">
                  Mentors
                </Link>
              </li>
              <li>
                <Link href="#trainers" className="text-gray-400 hover:text-white transition-colors">
                  Trainers
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  TikTok Guidelines
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Creator Tips
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={24} />
              </a>
            </div>
            <p className="text-gray-400">Email: contact@abdullahagency.com</p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Abdullah Agency. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ by{" "}
            <a 
              href="https://abdulmajid.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-pink-400 hover:text-pink-300 transition-colors font-medium"
            >
              Software Engineer Majid
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

