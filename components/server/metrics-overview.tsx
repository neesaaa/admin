import { Cpu, MemoryStickIcon as Memory, HardDrive, Wifi } from "lucide-react"
import { MetricCard } from "@/components/ui/metric-card"
import { StatsGrid } from "@/components/ui/stats-grid"

export function MetricsOverview() {
  return (
    <div className="mb-6 rounded-lg bg-[#0a2a3f] p-6">
      <StatsGrid>
        <MetricCard title="CPU Load" value="42%" change="+12% from yesterday" trend="up" icon={Cpu} />
        <MetricCard title="Memory usage" value="80%" change="+12% from yesterday" trend="up" icon={Memory} />
        <MetricCard title="Disk usage" value="60%" change="+15% from yesterday" trend="up" icon={HardDrive} />
        <MetricCard title="Network usage" value="500 MB/s" change="+18% from yesterday" trend="up" icon={Wifi} />
      </StatsGrid>
    </div>
  )
}
