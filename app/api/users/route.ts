import { NextResponse } from "next/server"

// Mock data for API demonstration
// In a real app, this would come from a database
const users = [
  {
    id: 1,
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    status: "Active",
    joinDate: "Jan 12, 2023",
    lastActive: "Today, 2:30 PM",
    projectCount: 18,
  },
  {
    id: 2,
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    status: "Active",
    joinDate: "Feb 3, 2023",
    lastActive: "Yesterday, 5:15 PM",
    projectCount: 12,
  },
  {
    id: 3,
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    status: "Active",
    joinDate: "Mar 15, 2023",
    lastActive: "Today, 10:45 AM",
    projectCount: 8,
  },
  {
    id: 4,
    name: "William Kim",
    email: "william.kim@example.com",
    status: "Active",
    joinDate: "Apr 22, 2023",
    lastActive: "2 days ago",
    projectCount: 15,
  },
  {
    id: 5,
    name: "Sofia Davis",
    email: "sofia.davis@example.com",
    status: "Inactive",
    joinDate: "May 8, 2023",
    lastActive: "1 week ago",
    projectCount: 5,
  },
  {
    id: 6,
    name: "Ethan Johnson",
    email: "ethan.johnson@example.com",
    status: "Active",
    joinDate: "Jun 17, 2023",
    lastActive: "Today, 9:20 AM",
    projectCount: 10,
  },
  {
    id: 7,
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    status: "Active",
    joinDate: "Jul 4, 2023",
    lastActive: "Yesterday, 3:30 PM",
    projectCount: 7,
  },
  {
    id: 8,
    name: "Noah Brown",
    email: "noah.brown@example.com",
    status: "Inactive",
    joinDate: "Aug 29, 2023",
    lastActive: "3 weeks ago",
    projectCount: 3,
  },
]

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  return NextResponse.json(users)
}
