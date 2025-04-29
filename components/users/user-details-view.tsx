"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { ProjectListItem } from "@/components/ui/project-list-item"
import { SectionContainer } from "@/components/ui/section-container"
import { Activity, ArrowLeft, Calendar, Mail } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

interface UserDetailsViewProps {
  userId: string
}

export function UserDetailsView({ userId }: UserDetailsViewProps) {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Simulate API fetch
    const fetchUser = async () => {
      // In a real app, fetch from API based on userId
      setLoading(true)

      // Mock data
      const mockUser = {
        id: Number.parseInt(userId),
        name: ["Olivia Martin", "Jackson Lee", "Isabella Nguyen", "William Kim"][Number.parseInt(userId) - 1] || "User",
        email: `user${userId}@example.com`,
        status: "Active",
        joinDate: "Jan 12, 2023",
        lastActive: "Today, 2:30 PM",
        projects: [
          {
            id: 1,
            projectName: "E-commerce Platform",
            datetime: "2 days ago",
            status: "Active",
            staticDynamic: "Dynamic",
            link: "https://ecommerce-platform.astrcloud.com",
          },
          {
            id: 2,
            projectName: "Marketing Website",
            datetime: "5 days ago",
            status: "Active",
            staticDynamic: "Static",
            link: "https://marketing-website.astrcloud.com",
          },
          {
            id: 3,
            projectName: "Analytics Dashboard",
            datetime: "1 week ago",
            status: "Active",
            staticDynamic: "Dynamic",
            link: "https://analytics-dashboard.astrcloud.com",
          },
        ].slice(0, (Number.parseInt(userId) % 3) + 1), // Different number of projects per user
      }

      setUser(mockUser)
      setLoading(false)
    }

    fetchUser()
  }, [userId])

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-lg">Loading user details...</div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="mb-4">
        <Link href="/pages/users" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Users
        </Link>
      </div>

      <PageHeader title={user.name} description="User details and projects" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <SectionContainer title="User Information" className="md:col-span-2">
          <div className="bg-[#0a2a3f] rounded-lg p-4 text-white">
            <div className="flex items-start mb-6">
              <div className="h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-xl font-medium text-gray-700">{user.name.charAt(0).toUpperCase()}</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-bold">{user.name}</h3>
                <div className="flex items-center text-gray-300 mt-1">
                  <Mail className="h-4 w-4 mr-1" />
                  <span>{user.email}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1a3a4f] p-3 rounded-lg">
                <div className="text-gray-300 text-sm mb-1 flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Joined
                </div>
                <div>{user.joinDate}</div>
              </div>

              <div className="bg-[#1a3a4f] p-3 rounded-lg">
                <div className="text-gray-300 text-sm mb-1 flex items-center">
                  <Activity className="h-4 w-4 mr-1" />
                  Last Active
                </div>
                <div>{user.lastActive}</div>
              </div>

                <div className="bg-[#1a3a4f] p-3 rounded-lg">
                  <div className="text-gray-300 text-sm mb-1">Status</div>
                  <div className="flex items-center">
                    <div
                      className={`h-2 w-2 rounded-full mr-2 ${
                        user.status === 'Active' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                    ></div>
                    {user.status}
                  </div>
              </div>
              <div className="bg-[#1a3a4f] p-3 rounded-lg">
                <div className="text-gray-300 text-sm mb-1">Projects</div>
                <div className="flex items-center">
                  <div className="rounded-full bg-white px-3 py-1 text-xs text-black">{user.projects.length}</div>
                </div>
              </div>
            </div>
          </div>
        </SectionContainer>

        <SectionContainer title="Account Actions">
          <div className="bg-[#0a2a3f] rounded-lg p-4 text-white space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">Edit User</button>
            <button className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded">
              Reset Password
            </button>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded">Suspend Account</button>
          </div>
        </SectionContainer>
      </div>

      <SectionContainer title="User Projects" description={`Projects created by ${user.name}`}>
        <div className="space-y-4">
          {user.projects.length > 0 ? (
            user.projects.map((project: any) => (
              <ProjectListItem
                key={project.id}
                userName={user.name}
                projectName={project.projectName}
                datetime={project.datetime}
                status={project.status}
                staticDynamic={project.staticDynamic}
                link={project.link}
              />
            ))
          ) : (
            <div className="bg-[#0a2a3f] rounded-lg p-4 text-white text-center">No projects found for this user.</div>
          )}
        </div>
      </SectionContainer>
    </PageLayout>
  )
}
