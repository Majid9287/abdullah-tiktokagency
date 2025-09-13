import DashboardSidebar from "@/components/dashboard/DashboardSidebar"
import DashboardNavbar from "@/components/dashboard/DashboardNavbar"

export const metadata = {
  title: "Dashboard - Abdullah Agency",
  description: "Admin dashboard for Abdullah Agency",
}

export default function DashboardLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Fixed Sidebar */}
      <DashboardSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col md:ml-64">
        {/* Dashboard Navbar */}
        <DashboardNavbar />

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}

