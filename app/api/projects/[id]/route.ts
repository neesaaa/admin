import { NextResponse } from "next/server"

// Mock data for API demonstration
const projectsDetails = {
  "1": {
    id: 1,
    userName: "Olivia Martin",
    projectName: "E-commerce Platform",
    datetime: "2 days ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://ecommerce-platform.astrcloud.com",
    description: "Main e-commerce platform for online retail",
    framework: "Next.js",
    nodeVersion: "18.x",
  },
  "2": {
    id: 2,
    userName: "Olivia Martin",
    projectName: "Marketing Website",
    datetime: "5 days ago",
    status: "Active",
    staticDynamic: "Static",
    link: "https://marketing-website.astrcloud.com",
    description: "Company marketing website",
    framework: "React",
    nodeVersion: "16.x",
  },
  "3": {
    id: 3,
    userName: "Olivia Martin",
    projectName: "Analytics Dashboard",
    datetime: "1 week ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://analytics-dashboard.astrcloud.com",
    description: "Analytics dashboard for business metrics",
    framework: "Next.js",
    nodeVersion: "18.x",
  },
  "4": {
    id: 4,
    userName: "Jackson Lee",
    projectName: "Payment Gateway",
    datetime: "2 weeks ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://payment-gateway.astrcloud.com",
    description: "Payment processing service",
    framework: "Next.js",
    nodeVersion: "18.x",
  },
  "5": {
    id: 5,
    userName: "Jackson Lee",
    projectName: "Customer Portal",
    datetime: "3 weeks ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://customer-portal.astrcloud.com",
    description: "Customer management portal",
    framework: "React",
    nodeVersion: "16.x",
  },
  "6": {
    id: 6,
    userName: "Isabella Nguyen",
    projectName: "Blog Platform",
    datetime: "1 month ago",
    status: "Active",
    staticDynamic: "Static",
    link: "https://blog-platform.astrcloud.com",
    description: "Company blog platform",
    framework: "Next.js",
    nodeVersion: "18.x",
  },
  "7": {
    id: 7,
    userName: "William Kim",
    projectName: "Admin Dashboard",
    datetime: "2 months ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://admin-dashboard.astrcloud.com",
    description: "Internal admin dashboard",
    framework: "Next.js",
    nodeVersion: "18.x",
  },
  "8": {
    id: 8,
    userName: "William Kim",
    projectName: "Mobile App Backend",
    datetime: "3 months ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://mobile-backend.astrcloud.com",
    description: "Backend API for mobile applications",
    framework: "Express.js",
    nodeVersion: "16.x",
  },
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const projectId = params.id
  const project = projectsDetails[projectId as keyof typeof projectsDetails]

  if (!project) {
    return new NextResponse(JSON.stringify({ error: "Project not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  return NextResponse.json(project)
}
