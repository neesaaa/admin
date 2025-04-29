import type { LucideIcon } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  change: string
  trend?: "up" | "down" | "neutral"
  icon: LucideIcon
}

export function MetricCard({ title, value, change, trend = "up", icon: Icon }: MetricCardProps) {
  return (
    <div className="rounded-lg bg-white p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="text-sm font-medium text-gray-600">{title}</div>
        <Icon className="h-5 w-5 text-gray-500" />
      </div>
      <div className="text-3xl font-bold">{value}</div>
      <div className={`text-sm ${trend === "up" ? "text-green-600" : "text-red-600"}`}>{change}</div>
    </div>
  )
}
