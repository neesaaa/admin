"use client"

import { Cpu, MemoryStickIcon as Memory, HardDrive, Wifi } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { StatsGrid } from "@/components/ui/stats-grid"
import { useQuery } from "@tanstack/react-query"

// Mock API function - replace with actual API call
async function getServerMetrics() {
  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 600))

  return {
    cpu: {
      value: "42%",
      change: "+12% from yesterday",
      trend: "up",
    },
    memory: {
      value: "80%",
      change: "+12% from yesterday",
      trend: "up",
    },
    disk: {
      value: "60%",
      change: "+15% from yesterday",
      trend: "up",
    },
    network: {
      value: "500 MB/s",
      change: "+18% from yesterday",
      trend: "up",
    },
  }
}

export function MetricsOverview() {
  const { data: metrics, isLoading } = useQuery({
    queryKey: ["serverMetrics"],
    queryFn: getServerMetrics,
  })

  if (isLoading) {
    return <div className="mb-6 rounded-lg bg-[#0a2a3f] p-6 text-white text-center">Loading metrics...</div>
  }

  return (
    <div className="mb-6 rounded-lg bg-[#0a2a3f] p-6">
      <StatsGrid>
        <MetricCard
          title="CPU Load"
          value={metrics?.cpu.value || "0%"}
          change={metrics?.cpu.change || "N/A"}
          trend="up"
          icon={Cpu}
        />
        <MetricCard
          title="Memory usage"
          value={metrics?.memory.value || "0%"}
          change={metrics?.memory.change || "N/A"}
          trend="up"
          icon={Memory}
        />
        <MetricCard
          title="Disk usage"
          value={metrics?.disk.value || "0%"}
          change={metrics?.disk.change || "N/A"}
          trend="up"
          icon={HardDrive}
        />
        <MetricCard
          title="Network usage"
          value={metrics?.network.value || "0 MB/s"}
          change={metrics?.network.change || "N/A"}
          trend="up"
          icon={Wifi}
        />
      </StatsGrid>
    </div>
  )
}
