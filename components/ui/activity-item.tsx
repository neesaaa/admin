interface ActivityItemProps {
  user: string
  action: string
  target?: string
  time: string
  type: string
}

export function ActivityItem({ user, action, target, time, type }: ActivityItemProps) {
  return (
    <div className="rounded-lg bg-[#0a2a3f] p-3 sm:p-4 text-white">
      <div className="flex items-start">
        <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-sm font-medium text-gray-700">{user.charAt(0).toUpperCase()}</span>
        </div>
        <div className="ml-3 flex-1">
          <div className="flex flex-wrap items-center gap-1">
            <div className="font-medium">{user}</div>
            {type === "new user" && (
              <span className="rounded bg-yellow-500 px-1.5 py-0.5 text-xs text-white">new user</span>
            )}
            {type === "project" && (
              <span className="rounded bg-green-500 px-1.5 py-0.5 text-xs text-white">project</span>
            )}
          </div>
          <div className="text-sm text-gray-300">
            {action} {target}
          </div>
          <div className="text-xs text-gray-400">{time}</div>
        </div>
      </div>
    </div>
  )
}
