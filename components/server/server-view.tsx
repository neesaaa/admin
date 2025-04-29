"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { PageHeader } from "@/components/ui/page-header"
import { MetricsOverview } from "@/components/server/metrics-overview"
import { SectionContainer } from "@/components/ui/section-container"
import { ResourceChart } from "@/components/ui/resource-chart"

export function ServerView() {
  // Mock data for the chart
  const chartData = [
    { name: "Jan", cpu: 60, memory: 45, disk: 30, network: 20 },
    { name: "Feb", cpu: 58, memory: 50, disk: 32, network: 25 },
    { name: "Mar", cpu: 78, memory: 55, disk: 35, network: 30 },
    { name: "Apr", cpu: 80, memory: 60, disk: 40, network: 35 },
    { name: "May", cpu: 55, memory: 65, disk: 45, network: 40 },
    { name: "Jun", cpu: 55, memory: 70, disk: 50, network: 45 },
    { name: "Jul", cpu: 40, memory: 75, disk: 55, network: 50 },
  ]

  return (
    <PageLayout>
      <PageHeader title="Server Management" description="Monitor and manage your server resources" />

      <MetricsOverview />

      <SectionContainer title="Server Status" description="Current server performance and health">
        <ResourceChart data={chartData} />
      </SectionContainer>
    </PageLayout>
  )
}
