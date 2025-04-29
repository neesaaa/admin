import { MoreHorizontal } from "lucide-react"
import Link from "next/link"

interface UserListItemProps {
  name: string
  status: string
  projects: number
  id?: number
}

export function UserListItem({ name, status, projects, id = 1 }: UserListItemProps) {
  return (
    <div className="grid grid-cols-12 gap-2 border-t border-gray-700 p-4">
      {/* User column - spans more columns on mobile */}
      <div className="col-span-6 md:col-span-4 flex items-center">
        <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
          <span className="text-xs font-medium text-gray-700">{name.charAt(0).toUpperCase()}</span>
        </div>
        <div className="ml-2">
          <div className="font-medium">{name}</div>
        </div>
      </div>

    {/* Status column - hidden on mobile */}
    <div className="hidden md:flex md:col-span-4 items-center">
      <div
        className={`h-2 w-2 rounded-full mr-2 ${
          status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
        }`}
      ></div>
      <div>{status}</div>
    </div>

      {/* Projects column */}
      <div className="col-span-4 md:col-span-3 flex items-center justify-start md:justify-center">
        <div className="rounded-full bg-white px-3 py-1 text-xs text-black">{projects}</div>
      </div>

      {/* Actions column */}
      <div className="col-span-2 md:col-span-1 flex items-center justify-end">
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
