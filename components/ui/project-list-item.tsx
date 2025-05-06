import { ChevronRight, MoreHorizontal, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"

interface ProjectListItemProps {
  userName: string
  projectName: string
  datetime: string
  status: string
  staticDynamic: string
  link: string
  id?: number
}

export function ProjectListItem({
  userName,
  projectName,
  datetime,
  status,
  staticDynamic,
  link,
  id = 1,
}: ProjectListItemProps) {
  return (
    <div className="rounded-lg bg-[#0a2a3f] p-4 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center">
        {/* User/Project info - always visible */}
        <div className="flex items-center mb-4 lg:mb-0 lg:w-[220px]">
          <div className="h-12 w-12 rounded-full bg-gray-300 flex items-center justify-center">
            <span className="text-base font-medium text-gray-700">{userName.charAt(0).toUpperCase()}</span>
          </div>

          <div className="ml-4 space-y-1">
            <div className="font-medium">{userName}</div>
            <div className="text-sm text-gray-300">{projectName}</div>
          </div>
        </div>

        {/* Mobile view - stacked info */}
        <div className="grid grid-cols-2 gap-2 lg:hidden mt-2">
          <div className="text-xs text-gray-300">Date:</div>
          <div className="text-sm">{datetime}</div>

          <div className="text-xs text-gray-300">Link:</div>
          <div className="text-sm">
            <a href={link} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>

          <div className="text-xs text-gray-300">Status:</div>
          <div className="text-sm">{status}</div>

          <div className="text-xs text-gray-300">Type:</div>
          <div className="text-sm">{staticDynamic}</div>
        </div>

        {/* Desktop view - horizontal layout */}
        <div className="hidden lg:grid lg:grid-cols-5 lg:flex-1 lg:items-center">
          {/* Date column - fixed width and right aligned */}
          <div className="text-right pr-6">{datetime}</div>

          {/* Link column */}
          <div className="text-center">
            <a href={link} className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
              View
            </a>
          </div>

          {/* Status column */}
          <div className="text-center">{status}</div>

          {/* Type column */}
          <div className="text-center">{staticDynamic}</div>

          {/* Action buttons */}
          <div className="flex items-center justify-end space-x-2">
            <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300">
              <RefreshCw className="h-4 w-4" />
            </button>
            <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300">
              <Trash2 className="h-4 w-4" color="#8B0000" />
            </button>
            <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300">
              <MoreHorizontal className="h-4 w-4" />
            </button>
            <Link href={`/pages/projects/${id}`} passHref>
              <button className="ml-2 rounded-lg bg-transparent p-2 text-white hover:bg-[#1a3a4f]">
                <ChevronRight className="h-4 w-4" />
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile action buttons */}
        <div className="flex justify-end mt-4 lg:hidden">
          <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300 mr-2">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300 mr-2">
            <Trash2 className="h-4 w-4" color="#8B0000"/>
          </button>
          <button className="rounded-lg bg-[#a7bbc7] p-2 text-[#0a2a3f] hover:bg-gray-300 mr-2">
            <MoreHorizontal className="h-4 w-4" />
          </button>
          <Link href={`/pages/projects/${id}`} passHref>
            <button className="rounded-lg bg-transparent p-2 text-white hover:bg-[#1a3a4f]">
              <ChevronRight className="h-4 w-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
