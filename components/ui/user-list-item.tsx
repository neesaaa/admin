import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface UserListItemProps {
  name: string
  status: string
  projects: number
  id?: number
}

export function UserListItem({ name, status, projects, id = 1 }: UserListItemProps) {
  // Determine status color - green for active, yellow for inactive
  const statusColor = status.toLowerCase() === "active" ? "bg-green-500" : "bg-yellow-400"

  return (
    <div className="grid grid-cols-12 gap-2 border-t border-gray-700 p-4">
      {/* User column - spans more columns on mobile */}
      <div className="col-span-6 lg:col-span-4 flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700">{name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="ml-2">
          <div className="font-medium">{name}</div>
        </div>
      </div>

      {/* Status column - hidden on mobile */}
      <div className="hidden lg:flex lg:col-span-4 items-center">
        <div className={`mr-2 h-2.5 w-2.5 rounded-full ${statusColor}`}></div>
        {status}
      </div>

      {/* Projects column */}
      <div className="col-span-4 lg:col-span-3 flex items-center justify-start lg:justify-center">
        <div className="rounded-full bg-white px-3 py-1 text-xs text-black">{projects}</div>
      </div>

      {/* Actions column */}
      <div className="col-span-2 lg:col-span-1 flex items-center justify-end">
        <Link href={`/pages/users/${id}`}>
          <button className="rounded p-1 hover:bg-[#1a3a4f] group">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">View user details</span>
          </button>
        </Link>
      </div>
    </div>
  )
}
