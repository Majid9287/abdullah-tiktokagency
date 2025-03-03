export default function RecentActivity() {
  const activities = [
    {
      type: "member",
      action: "joined",
      name: "John Smith",
      time: "2 hours ago",
    },
    {
      type: "event",
      action: "created",
      name: "Live Streaming Masterclass",
      time: "5 hours ago",
    },
    {
      type: "mentor",
      action: "added",
      name: "Lisa Wang",
      time: "1 day ago",
    },
    {
      type: "memory",
      action: "uploaded",
      name: "Summer Creator Camp Photos",
      time: "2 days ago",
    },
    {
      type: "country",
      action: "added",
      name: "Brazil",
      time: "3 days ago",
    },
  ]

  return (
    <div>
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <ul className="divide-y divide-gray-200">
          {activities.map((activity, index) => (
            <li key={index} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-medium text-gray-800">
                    {activity.type === "member" && "New member "}
                    {activity.type === "event" && "Event "}
                    {activity.type === "mentor" && "Mentor "}
                    {activity.type === "memory" && "Memory "}
                    {activity.type === "country" && "Country "}
                  </span>
                  <span className="text-gray-600">{activity.action}: </span>
                  <span className="font-medium text-pink-600">{activity.name}</span>
                </div>
                <span className="text-sm text-gray-500">{activity.time}</span>
              </div>
            </li>
          ))}
        </ul>
        <div className="p-4 border-t">
          <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">View All Activity</button>
        </div>
      </div>
    </div>
  )
}

