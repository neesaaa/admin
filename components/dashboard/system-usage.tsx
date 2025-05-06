"use client"

import { useEffect, useState } from "react"
import { ResourceChart } from "@/components/ui/resource-chart"
import { SectionContainer } from "@/components/ui/section-container"

interface SystemUsageProps {
  className?: string
}

export function SystemUsage({ className = "" }: SystemUsageProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
    <SectionContainer
      title="System Usage"
      description="Resource utilization across your platform"
      className={className}
    >
      {mounted ? (
        <ResourceChart data={chartData} height={200} />
      ) : (
        <div className="h-[200px] flex items-center justify-center bg-white rounded-lg">Loading chart...</div>
      )}
    </SectionContainer>
  )
}
