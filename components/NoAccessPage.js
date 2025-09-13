import { ShieldX } from "lucide-react"

export default function NoAccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <ShieldX className="h-16 w-16 text-red-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">
          You don&apos;t have permission to access this page.
        </p>
        <p className="text-sm text-gray-500">
          Please contact your administrator if you believe this is an error.
        </p>
      </div>
    </div>
  )
}
