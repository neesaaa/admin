import { NextResponse } from "next/server"

// Mock data for API demonstration
const users = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    status: "Active",
    joinDate: "Jan 12, 2023",
    lastActive: "Today, 2:30 PM",
    projectCount: 18,
    projects: [
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
        userName: "Olivia Martin",
        projectName: "Marketing Website",
        datetime: "5 days ago",
        status: "Active",
        staticDynamic: "Static",
        link: "https://marketing-website.astrcloud.com",
      },
      {
        id: 3,
        userName: "Olivia Martin",
        projectName: "Analytics Dashboard",
        datetime: "1 week ago",
        status: "Active",
        staticDynamic: "Dynamic",
        link: "https://analytics-dashboard.astrcloud.com",
      },
    ],
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    status: "Active",
    joinDate: "Feb 3, 2023",
    lastActive: "Yesterday, 5:15 PM",
    projectCount: 12,
    projects: [
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
    ],
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    status: "Active",
    joinDate: "Mar 15, 2023",
    lastActive: "Today, 10:45 AM",
    projectCount: 8,
    projects: [
      {
        id: 6,
        userName: "Isabella Nguyen",
        projectName: "Blog Platform",
        datetime: "1 month ago",
        status: "Active",
        staticDynamic: "Static",
        link: "https://blog-platform.astrcloud.com",
      },
    ],
  },
  {
    id: 4,
    name: "William Kim",
    email: "william.kim@example.com",
    status: "Active",
    joinDate: "Apr 22, 2023",
    lastActive: "2 days ago",
    projectCount: 15,
    projects: [
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
    ],
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 700))

  const userId = Number.parseInt(params.id)
  const user = users.find((u) => u.id === userId)

  if (!user) {
    return new NextResponse(JSON.stringify({ error: "User not found" }), {
      status: 404,
      headers: { "Content-Type": "application/json" },
    })
  }

  return NextResponse.json(user)
}
