"use client"

import { SectionContainer } from "@/components/ui/section-container"
import { UserListItem } from "@/components/ui/user-list-item"
import { getUsers } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface UsersSectionProps {
  className?: string
}

export function UsersSection({ className = "" }: UsersSectionProps) {
  // Fetch users with React Query - limit to 4 for dashboard
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users", "dashboard"],
    queryFn: getUsers,
    select: (data) => data.slice(0, 4), // Only show first 4 users on dashboard
  })

  return (
    <SectionContainer
      title="Users"
      description="Recent users in your platform"
      className={className}
      action={
        <Link href="/pages/users">
          <button className="flex items-center text-sm text-[#042C42] hover:text-white">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </Link>
      }
    >
      <div className="overflow-hidden rounded-lg bg-[#0a2a3f] text-white">
        <div className="grid grid-cols-12 gap-2 p-4 font-medium">
          <div className="col-span-6 lg:col-span-4">User</div>
          <div className="hidden lg:block lg:col-span-4">Status</div>
          <div className="col-span-4 lg:col-span-3 flex justify-start lg:justify-center">Projects</div>
          <div className="col-span-2 lg:col-span-1"></div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">Loading users...</div>
        ) : error ? (
          <div className="p-8 text-center text-red-400">Error loading users</div>
        ) : users.length > 0 ? (
          users.map((user) => (
            <UserListItem
              key={user.id}
              id={user.id}
              name={user.name}
              status={user.status}
              projects={user.projectCount}
            />
          ))
        ) : (
          <div className="p-8 text-center">No users found</div>
        )}
      </div>
    </SectionContainer>
  )
}
