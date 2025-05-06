"use client"

import { Users, User, LayoutDashboard } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { StatsGrid } from "@/components/ui/stats-grid"
import { useQuery } from "@tanstack/react-query"
import { getUsers, getProjects } from "@/lib/api-client"

interface DashboardStatsProps {
  timeRange: string
  onTimeRangeChange: (range: string) => void
}

export function DashboardStats({ timeRange, onTimeRangeChange }: DashboardStatsProps) {
  // Fetch data with React Query
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  })

  const { data: projects = [] } = useQuery({
    queryKey: ["projects"],
    queryFn: getProjects,
  })

  // Calculate stats
  const totalUsers = users.length
  const activeUsers = users.filter((user) => user.status === "Active").length
  const inactiveUsers = totalUsers - activeUsers
  const totalProjects = projects.length

  return (
    <div className="mb-4 rounded-2xl bg-[#0a2a3f] p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {["Daily", "Weekly", "Monthly"].map((range) => (
          <button
            key={range}
            className={`rounded px-2 py-1 text-xs sm:px-4 sm:py-1 sm:text-sm ${
              timeRange === range ? "bg-white text-black" : "bg-transparent text-white hover:bg-[#1a3a4f]"
            }`}
            onClick={() => onTimeRangeChange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <StatsGrid>
        <MetricCard
          title="New Users Today"
          value={`${activeUsers}`}
          change="+12% from yesterday"
          trend="up"
          icon={User}
        />
        <MetricCard title="Total Users" value={`${totalUsers}`} change="+12% from yesterday" trend="up" icon={Users} />
        <MetricCard
          title="Total Deployments"
          value={`${totalProjects}`}
          change="+15% from yesterday"
          trend="up"
          icon={LayoutDashboard}
        />
        <MetricCard
          title="Inactive Users"
          value={`${inactiveUsers}`}
          change="+18% from yesterday"
          trend="up"
          icon={User}
        />
      </StatsGrid>
    </div>
  )
}
