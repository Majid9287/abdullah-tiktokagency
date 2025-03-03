import DashboardSidebar from "@/components/dashboard/DashboardSidebar"

export const metadata = {
  title: "Dashboard - Abdullah Agency",
  description: "Admin dashboard for Abdullah Agency",
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar />
      <div className="flex-1 p-6 md:p-8">{children}</div>
    </div>
  )
}

