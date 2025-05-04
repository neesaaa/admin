"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Pagination } from "@/components/ui/pagination"
import { ProjectListItem } from "@/components/ui/project-list-item"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import { ChevronDown, Search } from "lucide-react"
import { useMemo, useState } from "react"

// Extend dayjs with relativeTime plugin
dayjs.extend(relativeTime)

// Generate 23 fake projects programmatically
const FAKE_PROJECTS = Array.from({ length: 100 }, (_, i) => {
  const id = i + 1
  const projectNames = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta",
    "Theta", "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi",
    "Omicron", "Pi", "Rho", "Sigma", "Tau", "Upsilon",
    "Phi", "Chi", "Psi"
  ]
  const statuses = ["Published", "Draft", "Archived"]
  const types = ["Static", "Dynamic"]
  return {
    id,
    userName: `User${id}`,
    projectName: projectNames[i] || `Project${id}`,
    datetime: dayjs().subtract(id, "day").toISOString(),
    link: `https://example.com/${projectNames[i]?.toLowerCase() || `project${id}`}`,
    status: statuses[i % statuses.length],
    staticDynamic: types[i % types.length]
  }
})

export function ProjectsList() {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Last published")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 7 // Number of projects per page

  // Filter projects based on search query
  const filteredProjects = useMemo(
    () => FAKE_PROJECTS.filter((project) =>
      project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [searchQuery]
  )

  // Sort projects (only "Last published" for now)
  const sortedProjects = useMemo(() => {
    if (sortBy === "Last published") {
      return [...filteredProjects].sort(
        (a, b) => new Date(b.datetime) - new Date(a.datetime)
      )
    }
    return filteredProjects
  }, [filteredProjects, sortBy])

  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(sortedProjects.length / itemsPerPage))
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = sortedProjects.slice(indexOfFirstItem, indexOfLastItem)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
    setCurrentPage(1)
  }

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
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </div>


      <div className="space-y-4">
        {currentItems.length > 0 ? (
          currentItems.map((project) => (
            <ProjectListItem
              key={project.id}
              userName={project.userName}
              projectName={project.projectName}
              datetime={dayjs(project.datetime).fromNow()}
              status={project.status}
              staticDynamic={project.staticDynamic}
              link={project.link}
            />
          ))
        ) : (
          <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
            {searchQuery
              ? "No projects found matching your search."
              : "No projects to display."}
          </div>
        )}
      </div>

      {/* Pagination with bottom margin for spacing */}
      {sortedProjects.length > 0 && (
        <div className="mt-6 mb-4">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
        </div>
      )}
    </>
  )
}
