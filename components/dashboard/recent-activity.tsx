"use client"

import { ActivityItem } from "@/components/ui/activity-item"
import { SectionContainer } from "@/components/ui/section-container"
import { useQuery } from "@tanstack/react-query"

interface RecentActivityProps {
  className?: string
}

// Mock API function - replace with actual API call
async function getRecentActivity() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
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
  ]
}

export function RecentActivity({ className = "" }: RecentActivityProps) {
  const {
    data: activities = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: getRecentActivity,
  })

  return (
    <SectionContainer
      title="Recent Activity"
      description="Latest activities from users and systems"
      className={className}
    >
      {isLoading ? (
        <div className="bg-[#0a2a3f] rounded-lg p-4 text-white text-center">Loading activities...</div>
      ) : error ? (
        <div className="bg-[#0a2a3f] rounded-lg p-4 text-white text-center text-red-400">Error loading activities</div>
      ) : (
        <div className="space-y-2">
          {activities.map((activity) => (
            <ActivityItem
              key={activity.id}
              user={activity.user}
              action={activity.action}
              target={activity.target}
              time={activity.time}
              type={activity.type}
            />
          ))}
        </div>
      )}
    </SectionContainer>
  )
}
