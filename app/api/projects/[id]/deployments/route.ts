import { NextResponse } from "next/server"

// Mock data for API demonstration
const projectDeployments = {
  "1": [
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
  ],
  "2": [
    {
      id: "dep6",
      title: "Deploy live for 7b2cde4f567 (feature/homepage-redesign)",
      status: "success",
      timestamp: "March 10, 2023 at 9:15 AM",
      hasLogs: true,
      details: "Build completed successfully in 32s\nDeployed to production",
    },
    {
      id: "dep7",
      title: "Deploy Failed for 7b2cde4f567 feature/homepage-redesign",
      status: "failed",
      timestamp: "March 10, 2023 at 9:00 AM",
      hasLogs: true,
      details: "Build failed\nError: CSS parsing error\nCheck console for more details",
      actions: ["View Build Logs", "Retry Deploy"],
    },
  ],
}

// Create default deployments for all projects
for (let i = 3; i <= 8; i++) {
  projectDeployments[i.toString()] = [
    {
      id: `dep${i}_1`,
      title: `Deploy live for ${Math.random().toString(36).substring(2, 15)} (main)`,
      status: "success",
      timestamp: "March 5, 2023 at 11:30 AM",
      hasLogs: true,
      details: "Build completed successfully in 38s\nDeployed to production\nAll tests passed",
    },
    {
      id: `dep${i}_2`,
      title: `Deploy started for ${Math.random().toString(36).substring(2, 15)} (feature/update)`,
      status: "in_progress",
      timestamp: "March 5, 2023 at 11:15 AM",
      hasLogs: true,
      details: "Building...\nRunning tests...",
    },
  ]
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  const projectId = params.id
  const deployments = projectDeployments[projectId as keyof typeof projectDeployments]

  if (!deployments) {
    return new NextResponse(JSON.stringify({ error: "Deployments not found for this project" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  return NextResponse.json(deployments)
}
