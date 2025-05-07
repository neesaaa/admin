"use client"

import { useState } from "react"
import { ChevronRight, AlertCircle, CheckCircle, Clock, ArrowRight } from "lucide-react"

interface ProjectDeploymentsProps {
  projectId: string
}

// Mock data for deployments since the API call might be broken
const mockDeployments = [
  {
    id: "dep1",
    title: "Deploy live for 3a3ede8a123 (test/last commit message)",
    status: "success",
    timestamp: "March 15, 2023 at 10:30 AM",
    hasLogs: true,
    details: "Build completed successfully in 45s\nDeployed to production\nAll tests passed",
  },
  {
    id: "dep2",
    title: "Deploy started for 3a3ede8a123 test/add adsd",
    status: "in_progress",
    timestamp: "March 15, 2023 at 10:15 AM",
    hasLogs: true,
    details: "Building...\nRunning tests...",
  },
  {
    id: "dep3",
    title: "Deploy Failed for 3a3ede8a123 test/add adsd",
    status: "failed",
    timestamp: "March 14, 2023 at 4:20 PM",
    hasLogs: true,
    details: "Build failed\nError: Module not found\nCheck console for more details",
    actions: ["View Build Logs", "Retry Deploy"],
  },
  {
    id: "dep4",
    title: "maintenance deploy started for 3a3ede8a123",
    status: "in_progress",
    timestamp: "March 14, 2023 at 2:45 PM",
    hasLogs: false,
  },
  {
    id: "dep5",
    title: "maintenance deploy finished for 3a3ede8a123",
    status: "success",
    timestamp: "March 14, 2023 at 3:00 PM",
    hasLogs: true,
    details: "Maintenance completed successfully",
  },
]

export function ProjectDeployments({ projectId }: ProjectDeploymentsProps) {
  const [expandedDeployment, setExpandedDeployment] = useState<string | null>(null)

  // Use the mock data directly instead of relying on the API call
  const deployments = mockDeployments

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
