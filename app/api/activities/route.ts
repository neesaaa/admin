import { NextResponse } from "next/server"

// Mock data for API demonstration
const activities = [
  {
    id: 1,
    user: "Isabella Nguyen",
    action: "updated",
    target: "Analytics Dashboard",
    time: "5 hours ago",
    type: "project",
  },
  {
    id: 2,
    user: "William Kim",
    action: "updated",
    target: "Payment Gateway",
    time: "5 hours ago",
    type: "project",
  },
  {
    id: 3,
    user: "Sofia Davis",
    action: "new user sign in",
    time: "2 hours ago",
    type: "new user",
  },
  {
    id: 4,
    user: "Ethan Johnson",
    action: "created",
    target: "New API Service",
    time: "1 day ago",
    type: "project",
  },
  {
    id: 5,
    user: "Emma Wilson",
    action: "deleted",
    target: "Test Project",
    time: "2 days ago",
    type: "project",
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(activities)
}
