import { NextResponse } from "next/server"

// Generate mock logs based on time filter
function generateMockLogs(timeFilter: string) {
  const logs = []
  const now = new Date()
  let numberOfLogs = 20

  // Adjust number of logs based on time filter
  if (timeFilter.includes("hour")) {
    numberOfLogs = 10
  } else if (timeFilter.includes("day")) {
    numberOfLogs = 30
  } else if (timeFilter.includes("week") || timeFilter.includes("7 days")) {
    numberOfLogs = 50
  }

  const levels = ["info", "warning", "error"]
  const levelDistribution = {
    info: 0.6, // 60% info
    warning: 0.3, // 30% warning
    error: 0.1, // 10% error
  }

  const messages = [
    "Application started",
    "User authentication successful",
    "Database connection established",
    "API request completed",
    "Cache invalidated",
    "Memory usage high",
    "CPU usage spike detected",
    "Failed to connect to external service",
    "Timeout waiting for response",
    "Invalid request parameters",
  ]

  for (let i = 0; i < numberOfLogs; i++) {
    // Generate random timestamp within the time filter
    const timestamp = new Date(now)
    if (timeFilter.includes("hour")) {
      timestamp.setMinutes(timestamp.getMinutes() - Math.random() * 60)
    } else if (timeFilter.includes("6 hours")) {
      timestamp.setHours(timestamp.getHours() - Math.random() * 6)
    } else if (timeFilter.includes("12 hours")) {
      timestamp.setHours(timestamp.getHours() - Math.random() * 12)
    } else if (timeFilter.includes("day")) {
      timestamp.setHours(timestamp.getHours() - Math.random() * 24)
    } else if (timeFilter.includes("3 days")) {
      timestamp.setDate(timestamp.getDate() - Math.random() * 3)
    } else if (timeFilter.includes("7 days") || timeFilter.includes("week")) {
      timestamp.setDate(timestamp.getDate() - Math.random() * 7)
    } else if (timeFilter.includes("14 days")) {
      timestamp.setDate(timestamp.getDate() - Math.random() * 14)
    } else if (timeFilter.includes("30 days") || timeFilter.includes("month")) {
      timestamp.setDate(timestamp.getDate() - Math.random() * 30)
    }

    // Determine log level based on distribution
    const rand = Math.random()
    let level
    if (rand < levelDistribution.info) {
      level = "info"
    } else if (rand < levelDistribution.info + levelDistribution.warning) {
      level = "warning"
    } else {
      level = "error"
    }

    const message = messages[Math.floor(Math.random() * messages.length)]

    logs.push({
      timestamp: timestamp.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
      level,
      message: `[name:a dkfadk sdfkjsdfkjsdfkjsdfkjsdfkjsdfkjs] ${message}`,
    })
  }

  // Sort logs by timestamp (newest first)
  return logs.sort((a, b) => {
    return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  })
}

export async function GET(request: Request, { params }: { params: { id: string } }) {
  // Get time filter from query params
  const url = new URL(request.url)
  const timeFilter = url.searchParams.get("timeFilter") || "Last day"

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const logs = generateMockLogs(timeFilter)

  return NextResponse.json(logs)
}
