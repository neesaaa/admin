"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { useMobile } from "@/hooks/use-mobile"
import { useEffect, useState } from "react"

interface ResourceChartProps {
  data: any[]
  height?: number | string
  className?: string
}

export function ResourceChart({ data, height = 300, className = "" }: ResourceChartProps) {
  const isMobile = useMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="flex h-[300px] items-center justify-center">Loading chart...</div>
  }

  // Convert height to a proper CSS value
  const heightValue = typeof height === "number" ? `${height}px` : height

  return (
    <div className={`rounded-lg bg-white p-4 ${className}`} style={{ height: heightValue }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="cpu"
            stroke="#8884d8"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="CPU"
          />
          <Line
            type="monotone"
            dataKey="memory"
            stroke="#82ca9d"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
            name="Memory"
          />
          {!isMobile && (
            <>
              <Line
                type="monotone"
                dataKey="disk"
                stroke="#ffc658"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Disk"
              />
              <Line
                type="monotone"
                dataKey="network"
                stroke="#ff8042"
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                name="Network"
              />
            </>
          )}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
