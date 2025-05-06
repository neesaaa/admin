"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { UserListItem } from "@/components/ui/user-list-item"
import { Search } from "lucide-react"
import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getUsers } from "@/lib/api-client"

export function UsersListView() {
  const [searchQuery, setSearchQuery] = useState("")

  // Fetch users with React Query
  const {
    data: users = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  // Filter users based on search query
  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <PageLayout>
      <PageHeader title="Users" description="Manage all users in your platform" />

      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search users..."
            className="w-full rounded-lg bg-white py-2 pl-10 pr-4 text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {isLoading ? (
        <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">Loading users...</div>
      ) : error ? (
        <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
          <p className="text-red-400 mb-2">Error loading users</p>
          <p className="text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-lg bg-[#0a2a3f] text-white">
          <div className="grid grid-cols-12 gap-2 p-4 font-medium">
            <div className="col-span-6 md:col-span-4">User</div>
            <div className="hidden md:block md:col-span-4">Status</div>
            <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center">Projects</div>
            <div className="col-span-2 md:col-span-1"></div>
          </div>

          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <UserListItem
                key={user.id}
                id={user.id}
                name={user.name}
                status={user.status}
                projects={user.projectCount}
              />
            ))
          ) : (
            <div className="p-8 text-center text-gray-300">No users found matching your search.</div>
          )}
        </div>
      )}
    </PageLayout>
  )
}
