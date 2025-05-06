"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Pagination } from "@/components/ui/pagination"
import { ProjectListItem } from "@/components/ui/project-list-item"
import { getProjects } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { ChevronDown, Search } from "lucide-react"
import { useEffect, useState } from "react"

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Last published")
  const [currentPage, setCurrentPage] = useState(1)

  // Dynamically set items per page: 4 if viewport ≤640px, else 7
  const [itemsPerPage, setItemsPerPage] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 640 ? 3 : 7
  )

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)")
    const onChange = (e: MediaQueryListEvent) => {
      setItemsPerPage(e.matches ? 3: 7)
      setCurrentPage(1) // optional: reset to first page when layout changes
    }
    mq.addEventListener("change", onChange)
    return () => mq.removeEventListener("change", onChange)
  }, [])

  // Fetch projects
  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })

  // Filter and paginate
  const filtered = projects.filter((p) =>
    p.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  )
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const start = (currentPage - 1) * itemsPerPage
  const currentItems = filtered.slice(start, start + itemsPerPage)

  return (
    <>
      <PageHeader title="Projects" description="Manage all projects in your platform" />

      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 pb-4">
        <div className="relative w-full lg:w-64">
          <button className="flex w-full items-center justify-between rounded-lg bg-white px-4 py-2 text-sm">
            <span>{sortBy}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
        </div>

        <div className="relative w-full lg:flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="search by project name"
              className="w-full rounded-lg bg-white py-2 pl-10 pr-4 text-sm"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
          Loading projects...
        </div>
      ) : error ? (
        <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
          <p className="text-red-400 mb-2">Error loading projects</p>
          <p className="text-sm">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {currentItems.length > 0 ? (
              currentItems.map((project) => (
                <ProjectListItem
                  key={project.id}
                  userName={project.userName}
                  projectName={project.projectName}
                  datetime={project.datetime}
                  status={project.status}
                  staticDynamic={project.staticDynamic}
                  link={project.link}
                />
              ))
            ) : (
              <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
                No projects found matching your search.
              </div>
            )}
          </div>

          {filtered.length > 0 && (
            <div className="mt-6 mb-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}
