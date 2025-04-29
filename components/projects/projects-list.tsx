"use client"

import { useState } from "react"
import { ChevronDown, Search, ChevronRight } from "lucide-react"
import { ProjectListItem } from "@/components/ui/project-list-item"
import { PageHeader } from "@/components/ui/page-header"

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("")

  // Mock data for projects with added link property
  const projects = [
    {
      id: 1,
      userName: "Olivia Martin",
      projectName: "E-commerce Platform",
      datetime: "2 days ago",
      status: "Active",
      staticDynamic: "Dynamic",
      link: "https://ecommerce-platform.astrcloud.com",
    },
    {
      id: 2,
      userName: "Jackson Lee",
      projectName: "Marketing Website",
      datetime: "5 days ago",
      status: "Active",
      staticDynamic: "Static",
      link: "https://marketing-website.astrcloud.com",
    },
    {
      id: 3,
      userName: "Isabella Nguyen",
      projectName: "Analytics Dashboard",
      datetime: "1 week ago",
      status: "Active",
      staticDynamic: "Dynamic",
      link: "https://analytics-dashboard.astrcloud.com",
    },
    {
      id: 4,
      userName: "William Kim",
      projectName: "Payment Gateway",
      datetime: "2 weeks ago",
      status: "Active",
      staticDynamic: "Dynamic",
      link: "https://payment-gateway.astrcloud.com",
    },
  ]
  const filteredProjects = projects.filter((p) =>
    p.projectName
      .toLowerCase()
      .startsWith(searchQuery.trim().toLowerCase())
  );

  return (
    <>
      <PageHeader title="Projects" description="Manage all projects in your platform" />

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4">
        <div className="relative w-full sm:w-64">
          <button className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-2 text-sm">
            <span>Last published</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="relative w-full sm:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="search by project name"
              className="w-full rounded-lg bg-white py-2 pl-10 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>


      <div className="space-y-4">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <ProjectListItem key={project.id} {...project} />
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No projects match “{searchQuery}”
          </div>
        )}
      </div>
    </>
  )
}
