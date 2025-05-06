"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { getProjectDeployments } from "@/lib/api-client"
import { ChevronRight, AlertCircle, CheckCircle, Clock, ArrowRight } from "lucide-react"

interface ProjectDeploymentsProps {
  projectId: string
}

export function ProjectDeployments({ projectId }: ProjectDeploymentsProps) {
  const [expandedDeployment, setExpandedDeployment] = useState<string | null>(null)

  const {
    data: deployments = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["projectDeployments", projectId],
    queryFn: () => getProjectDeployments(projectId),
  })

  if (isLoading) {
    return <div className="bg-[#0a2a3f] rounded-lg p-6 text-white text-center">Loading deployments...</div>
  }

  if (error) {
    return (
      <div className="bg-[#0a2a3f] rounded-lg p-6 text-white text-center">
        <p className="text-red-400 mb-2">Error loading deployments</p>
        <p className="text-sm">{error instanceof Error ? error.message : "Unknown error"}</p>
      </div>
    )
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "failed":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      case "in_progress":
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <Clock className="h-5 w-5 text-gray-400" />
    }
  }

  return (
    <div className="bg-[#0a2a3f] rounded-lg overflow-hidden">
      <div className="p-4 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Web Service</h2>
      </div>

      <div className="divide-y divide-gray-700">
        {deployments.map((deployment) => (
          <div key={deployment.id} className="p-4 text-white">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="mt-1">{getStatusIcon(deployment.status)}</div>
                <div>
                  <div className="font-medium">{deployment.title}</div>
                  <div className="text-sm text-gray-400">{deployment.timestamp}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {deployment.hasLogs && (
                  <button
                    onClick={() => setExpandedDeployment(expandedDeployment === deployment.id ? null : deployment.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-3 py-1 rounded"
                  >
                    Full logs
                  </button>
                )}
                <button
                  onClick={() => setExpandedDeployment(expandedDeployment === deployment.id ? null : deployment.id)}
                  className="p-1 hover:bg-gray-700 rounded"
                >
                  <ChevronRight
                    className={`h-5 w-5 transition-transform ${
                      expandedDeployment === deployment.id ? "rotate-90" : ""
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Expanded content */}
            {expandedDeployment === deployment.id && (
              <div className="mt-4 ml-8 pl-3 border-l border-gray-700">
                <div className="bg-gray-800 rounded p-3 text-sm">
                  <pre className="whitespace-pre-wrap font-mono text-xs">
                    {deployment.details || "No details available"}
                  </pre>
                </div>
                {deployment.actions && (
                  <div className="mt-3 flex gap-2">
                    {deployment.actions.map((action, index) => (
                      <button
                        key={index}
                        className="flex items-center gap-1 bg-blue-700 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        <ArrowRight className="h-3 w-3" />
                        <span>{action}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
