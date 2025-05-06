"use client"

import { useState } from "react"
import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { SystemUsage } from "@/components/dashboard/system-usage"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { UsersSection } from "@/components/dashboard/users-section"

export function DashboardView() {
  const [timeRange, setTimeRange] = useState("Daily")

  return (
    <PageLayout>
      <PageHeader
        title="Admin Dashboard"
        description="Manage your platform users, projects, and monitor system activity."
      />

      <DashboardStats timeRange={timeRange} onTimeRangeChange={setTimeRange} />
      <SystemUsage className="mb-4" />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <RecentActivity />
        <UsersSection />
      </div>
    </PageLayout>
  )
}
