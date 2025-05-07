"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { ProjectDeployments } from "@/components/projects/project-deployments"
import { ProjectLogs } from "@/components/projects/project-logs"
import { ProjectSettings } from "@/components/projects/project-settings"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getProjectById } from "@/lib/api-client"
import { useQuery } from "@tanstack/react-query"
import { ArrowLeft, RefreshCw, Trash2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface ProjectDetailViewProps {
  projectId: string
}

export function ProjectDetailView({ projectId }: ProjectDetailViewProps) {
  const [activeTab, setActiveTab] = useState("deployments")

  // Fetch project details
  const {
    data: project,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["project", projectId],
    queryFn: () => getProjectById(projectId),
    // Add retry and error handling
    retry: 1,
    refetchOnWindowFocus: false,
    onError: (err) => {
      console.error("Error fetching project details:", err)
    },
  })

  if (isLoading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading project details...</div>
        </div>
      </PageLayout>
    )
  }

  if (error || !project) {
    return (
      <PageLayout>
        <div className="mb-4">
          <Link href="/pages/projects" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Projects
          </Link>
        </div>

        <div className="bg-[#0a2a3f] rounded-lg p-8 text-white text-center">
          <p className="text-red-400 mb-2">Error loading project details</p>
          <p className="text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="mb-4">
        <Link href="/pages/projects" className="flex items-center text-sm text-blue-600 hover:text-blue-800">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Projects
        </Link>
      </div>

      {/* Project Header */}
      <div className="mb-6 rounded-lg overflow-hidden border border-gray-200">
        <div className="bg-[#0a2a3f] p-4 text-white flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-40 h-24 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="text-sm text-center">website photo</div>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold">{project.projectName}</h1>
            <div className="text-sm text-gray-300">
              <div>deploy type: {project.staticDynamic}</div>
              <div>site name: {project.link.replace("https://", "")}</div>
              <div>published in: {project.datetime}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 md:self-start">
            <button
              onClick={() => refetch()}
              className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Rebuild</span>
            </button>
            <button className="flex items-center gap-1 bg-red-700 hover:bg-red-600 text-white px-3 py-1.5 rounded-md text-sm">
              <Trash2 className="h-4 w-4" color="white" />
              <span>Delete</span>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="bg-[#0a2a3f] text-white w-full">
          <TabsTrigger value="deployments" className="data-[state=active]:bg-white data-[state=active]:text-[#0a2a3f]">
            Deployments
          </TabsTrigger>
          <TabsTrigger value="logs" className="data-[state=active]:bg-white data-[state=active]:text-[#0a2a3f]">
            Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="data-[state=active]:bg-white data-[state=active]:text-[#0a2a3f]">
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deployments" className="space-y-4">
          <ProjectDeployments projectId={projectId} />
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <ProjectLogs projectId={projectId} />
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <ProjectSettings project={project} />
        </TabsContent>
      </Tabs>
    </PageLayout>
  )
}
