import { NextResponse } from "next/server"

// Mock data for API demonstration
const projects = [
  {
    id: 1,
    userName: "Tom Tom Tom sahoor",
    projectName: "E-commerce Platform",
    datetime: "2 days ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://ecommerce-platform.astrcloud.com",
  },
  {
    id: 2,
    userName: "Tom Tom Tom sahoor",
    projectName: "Marketing Website",
    datetime: "5 days ago",
    status: "Active",
    staticDynamic: "Static",
    link: "https://marketing-website.astrcloud.com",
  },
  {
    id: 3,
    userName: "Tom Tom Tom sahoor",
    projectName: "Analytics Dashboard",
    datetime: "1 week ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://analytics-dashboard.astrcloud.com",
  },
  {
    id: 4,
    userName: "Jackson Lee",
    projectName: "Payment Gateway",
    datetime: "2 weeks ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://payment-gateway.astrcloud.com",
  },
  {
    id: 5,
    userName: "Jackson Lee",
    projectName: "Customer Portal",
    datetime: "3 weeks ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://customer-portal.astrcloud.com",
  },
  {
    id: 6,
    userName: "Isabella Nguyen",
    projectName: "Blog Platform",
    datetime: "1 month ago",
    status: "Active",
    staticDynamic: "Static",
    link: "https://blog-platform.astrcloud.com",
  },
  {
    id: 7,
    userName: "William Kim",
    projectName: "Admin Dashboard",
    datetime: "2 months ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://admin-dashboard.astrcloud.com",
  },
  {
    id: 8,
    userName: "William Kim",
    projectName: "Mobile App Backend",
    datetime: "3 months ago",
    status: "Active",
    staticDynamic: "Dynamic",
    link: "https://mobile-backend.astrcloud.com",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  return NextResponse.json(projects)
}
