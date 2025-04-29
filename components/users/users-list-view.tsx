"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { UserListItem } from "@/components/ui/user-list-item"
import { Search } from "lucide-react"
import { useState } from "react"

export function UsersListView() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for users - in a real app, this would come from an API
  const users = [
    {
      id: 1,
      name: "Olivia Martin",
      status: "Active",
      projects: 18,
    },
    {
      id: 2,
      name: "Jackson Lee",
      status: "Active",
      projects: 12,
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      status: "Active",
      projects: 8,
    },
    {
      id: 4,
      name: "William Kim",
      status: "Active",
      projects: 15,
    },
    {
      id: 5,
      name: "Sofia Davis",
      status: "Inactive",
      projects: 5,
    },
    {
      id: 6,
      name: "Ethan Johnson",
      status: "Active",
      projects: 10,
    },
    {
      id: 7,
      name: "Emma Wilson",
      status: "Active",
      projects: 7,
    },
    {
      id: 8,
      name: "Noah Brown",
      status: "Inactive",
      projects: 3,
    },
  ]

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

      <div className="overflow-hidden rounded-lg bg-[#0a2a3f] text-white">
        <div className="grid grid-cols-12 gap-2 p-4 font-medium">
          <div className="col-span-6 md:col-span-4">User</div>
          <div className="hidden md:block md:col-span-4">Status</div>
          <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center">Projects</div>
          <div className="col-span-2 md:col-span-1"></div>
        </div>

        {filteredUsers.map((user) => (
          <UserListItem key={user.id} id={user.id} name={user.name} status={user.status} projects={user.projects} />
        ))}
      </div>
    </PageLayout>
  )
}
