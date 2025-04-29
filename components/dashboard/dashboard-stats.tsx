"use client"

import { MetricCard } from "@/components/ui/metric-card"
import { StatsGrid } from "@/components/ui/stats-grid"
import { LayoutDashboard, User, Users } from "lucide-react"
import { useEffect, useState } from "react"

interface MetricDto {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}
const getDummyData = (range: string): MetricDto[] => {
  const rangeMap: Record<string, number> = {
    daily: 1,
    weekly: 7,
    monthly: 30
  }
  
  const baseValue = rangeMap[range.toLowerCase()] * 3*2*5;
  const trend = 'up' // Can be randomized if needed

  return [
    {
      title: "new users today",
      value: (baseValue).toString(),
      change: `+${baseValue / 5}% from previous ${range}`,
      trend
    },
    {
      title: "Total users",
      value: (baseValue * 30).toString(),
      change: `+${baseValue / 2}% from previous ${range}`,
      trend
    },
    {
      title: "Total Deployments",
      value: (baseValue * 20).toString(),
      change: `+${baseValue / 3}% from previous ${range}`,
      trend
    },
    {
      title: "non users",
      value: (baseValue / 2).toString(),
      change: `+${baseValue / 6}% from previous ${range}`,
      trend
    }
  ]
}

export function DashboardStats() {
  const [timeRange, setTimeRange] = useState<string>("Daily")
  const [metrics, setMetrics] = useState<MetricDto[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMetrics = async () => {
      const dummyData = getDummyData(timeRange);
      setMetrics(dummyData);
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(`/api/metrics?range=${timeRange.toLowerCase()}`)
        if (!response.ok) throw new Error('Failed to fetch metrics')
        
        const data: MetricDto[] = await response.json()
        setMetrics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch metrics')
      } finally {
        setLoading(false)
      }
    }

    fetchMetrics()
  }, [timeRange]) // Re-fetch when timeRange changes

  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'new users today': return User
      case 'total users': return Users
      case 'total deployments': return LayoutDashboard
      default: return User
    }
  }

  if (loading) {
    return (
      <div className="mb-4 rounded-2xl bg-[#0a2a3f] p-4 text-center text-white">
        Loading metrics...
      </div>
    )
  }

  // if (error) {
  //   return (
  //     <div className="mb-4 rounded-2xl bg-[#0a2a3f] p-4 text-center text-red-500">
  //       Error: {error}
  //     </div>
  //   )
  // }
  return (
    <div className="mb-4 rounded-2xl bg-[#0a2a3f] p-3 sm:p-4">
      <div className="mb-4 flex flex-wrap gap-2">
        {["Daily", "Weekly", "Monthly"].map((range) => (
          <button
            key={range}
            className={`rounded px-2 py-1 text-xs sm:px-4 sm:py-1 sm:text-sm ${
              timeRange === range ? "bg-white text-black" : "bg-transparent text-white hover:bg-[#1a3a4f]"
            }`}
            onClick={() => setTimeRange(range)}
          >
            {range}
          </button>
        ))}
      </div>

      <StatsGrid>
        {metrics.map((metric) => (
          <MetricCard
            key={metric.title}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            trend={metric.trend}
            icon={getIcon(metric.title)}
          />
        ))}
      </StatsGrid>
    </div>
  )
}