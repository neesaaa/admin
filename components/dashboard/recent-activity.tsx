import { ActivityItem } from "@/components/ui/activity-item"
import { SectionContainer } from "@/components/ui/section-container"

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className = "" }: RecentActivityProps) {
  // Mock data for recent activity
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
  ]

  return (
    <SectionContainer
      title="Recent Activity"
      description="Latest activities from users and systems"
      className={className}
    >
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
    </SectionContainer>
  )
}
