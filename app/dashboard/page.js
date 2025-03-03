import DashboardStats from "@/components/dashboard/DashboardStats"
import QuickActions from "@/components/dashboard/QuickActions"
import RecentActivity from "@/components/dashboard/RecentActivity"

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Dashboard Overview</h1>

      <DashboardStats />
      <QuickActions />
      <RecentActivity />
    </div>
  )
}

