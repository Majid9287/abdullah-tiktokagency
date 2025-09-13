"use client"

import { usePathname } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { ModalProvider } from "@/components/modal-context"
import JoinModal from "@/components/join-modal"

export default function LayoutWrapper({ children }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith('/dashboard')

  if (isDashboard) {
    return (
      <ModalProvider>
        <main className="flex-grow">
          {children}
        </main>
      </ModalProvider>
    )
  }

  return (
    <ModalProvider>
      <Header />
      <main className="flex-grow">
        {children}
        <JoinModal />
      </main>
      <Footer />
    </ModalProvider>
  )
}
