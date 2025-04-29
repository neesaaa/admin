"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { useMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

interface ServerMetricsProps {
  timeRange: string
  simplified?: boolean
}

export function ServerMetrics({ timeRange, simplified = false }: ServerMetricsProps) {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mock data - in a real app, this would come from your API and change based on timeRange
  const cpuData = [
    { time: "00:00", user: 45, system: 15, iowait: 5, idle: 35 },
    { time: "04:00", user: 50, system: 20, iowait: 10, idle: 20 },
    { time: "08:00", user: 65, system: 25, iowait: 5, idle: 5 },
    { time: "12:00", user: 70, system: 20, iowait: 5, idle: 5 },
    { time: "16:00", user: 60, system: 25, iowait: 10, idle: 5 },
    { time: "20:00", user: 55, system: 15, iowait: 5, idle: 25 },
    { time: "24:00", user: 40, system: 10, iowait: 5, idle: 45 },
  ]

  const memoryData = [
    { time: "00:00", used: 65, cached: 20, free: 15 },
    { time: "04:00", used: 70, cached: 15, free: 15 },
    { time: "08:00", used: 80, cached: 15, free: 5 },
    { time: "12:00", used: 85, cached: 10, free: 5 },
    { time: "16:00", used: 75, cached: 15, free: 10 },
    { time: "20:00", used: 70, cached: 20, free: 10 },
    { time: "24:00", used: 60, cached: 25, free: 15 },
  ]

  const diskData = [
    { time: "00:00", read: 25, write: 35 },
    { time: "04:00", read: 30, write: 40 },
    { time: "08:00", read: 45, write: 55 },
    { time: "12:00", read: 40, write: 60 },
    { time: "16:00", read: 35, write: 50 },
    { time: "20:00", read: 30, write: 45 },
    { time: "24:00", read: 20, write: 30 },
  ]

  const networkData = [
    { time: "00:00", in: 20, out: 30 },
    { time: "04:00", in: 25, out: 35 },
    { time: "08:00", in: 40, out: 50 },
    { time: "12:00", in: 45, out: 55 },
    { time: "16:00", in: 35, out: 45 },
    { time: "20:00", in: 30, out: 40 },
    { time: "24:00", in: 15, out: 25 },
  ]

  if (!mounted) {
    return <div className="h-[300px] flex items-center justify-center">Loading charts...</div>
  }

  if (simplified) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Server Performance</CardTitle>
          <CardDescription>CPU and memory usage over time</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cpuData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="user" stroke="#8884d8" name="CPU User" />
                <Line type="monotone" dataKey="system" stroke="#82ca9d" name="CPU System" />
                {!isMobile && <Line type="monotone" dataKey="iowait" stroke="#ffc658" name="CPU I/O Wait" />}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      <Tabs defaultValue="cpu" className="space-y-4">
        <TabsList>
          <TabsTrigger value="cpu">CPU</TabsTrigger>
          <TabsTrigger value="memory">Memory</TabsTrigger>
          <TabsTrigger value="disk">Disk I/O</TabsTrigger>
          <TabsTrigger value="network">Network</TabsTrigger>
        </TabsList>

        <TabsContent value="cpu">
          <Card>
            <CardHeader>
              <CardTitle>CPU Usage</CardTitle>
              <CardDescription>CPU utilization breakdown over {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cpuData} stackOffset="expand">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis tickFormatter={(tick) => `${tick * 100}%`} />
                    <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`} />
                    <Legend />
                    <Area type="monotone" dataKey="user" stackId="1" stroke="#8884d8" fill="#8884d8" name="User" />
                    <Area type="monotone" dataKey="system" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="System" />
                    <Area
                      type="monotone"
                      dataKey="iowait"
                      stackId="1"
                      stroke="#ffc658"
                      fill="#ffc658"
                      name="I/O Wait"
                    />
                    <Area type="monotone" dataKey="idle" stackId="1" stroke="#d3d3d3" fill="#d3d3d3" name="Idle" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricInfoCard title="Average CPU" value="42%" description="User + System" />
                <MetricInfoCard title="Peak Usage" value="85%" description="At 12:00" />
                <MetricInfoCard title="I/O Wait" value="5%" description="Average" />
                <MetricInfoCard title="Idle Time" value="18%" description="Average" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="memory">
          <Card>
            <CardHeader>
              <CardTitle>Memory Usage</CardTitle>
              <CardDescription>Memory utilization over {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={memoryData} stackOffset="expand">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis tickFormatter={(tick) => `${tick * 100}%`} />
                    <Tooltip formatter={(value) => `${(Number(value) * 100).toFixed(2)}%`} />
                    <Legend />
                    <Area type="monotone" dataKey="used" stackId="1" stroke="#8884d8" fill="#8884d8" name="Used" />
                    <Area type="monotone" dataKey="cached" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Cached" />
                    <Area type="monotone" dataKey="free" stackId="1" stroke="#d3d3d3" fill="#d3d3d3" name="Free" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricInfoCard title="Total Memory" value="64 GB" description="Physical RAM" />
                <MetricInfoCard title="Average Used" value="72%" description="46.1 GB" />
                <MetricInfoCard title="Peak Usage" value="85%" description="54.4 GB at 12:00" />
                <MetricInfoCard title="Swap Usage" value="2%" description="0.5 GB of 24 GB" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disk">
          <Card>
            <CardHeader>
              <CardTitle>Disk I/O</CardTitle>
              <CardDescription>Disk read/write operations over {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={diskData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="read" fill="#8884d8" name="Read (MB/s)" />
                    <Bar dataKey="write" fill="#82ca9d" name="Write (MB/s)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricInfoCard title="Avg Read" value="32 MB/s" description="Peak: 45 MB/s" />
                <MetricInfoCard title="Avg Write" value="45 MB/s" description="Peak: 60 MB/s" />
                <MetricInfoCard title="Disk Space" value="56%" description="450 GB of 800 GB" />
                <MetricInfoCard title="IOPS" value="1,250" description="Average operations/s" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network">
          <Card>
            <CardHeader>
              <CardTitle>Network Traffic</CardTitle>
              <CardDescription>Network in/out over {timeRange}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={networkData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="in" stroke="#8884d8" name="Inbound (MB/s)" />
                    <Line type="monotone" dataKey="out" stroke="#82ca9d" name="Outbound (MB/s)" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <MetricInfoCard title="Total In" value="1.2 TB" description="Over period" />
                <MetricInfoCard title="Total Out" value="1.8 TB" description="Over period" />
                <MetricInfoCard title="Peak In" value="45 MB/s" description="At 12:00" />
                <MetricInfoCard title="Peak Out" value="55 MB/s" description="At 12:00" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface MetricInfoCardProps {
  title: string
  value: string
  description: string
}

function MetricInfoCard({ title, value, description }: MetricInfoCardProps) {
  return (
    <div className="rounded-lg border bg-card p-3 text-card-foreground shadow-sm">
      <div className="text-sm font-medium">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{description}</div>
    </div>
  )
}
