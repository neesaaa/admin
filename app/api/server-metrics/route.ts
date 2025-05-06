import { NextResponse } from "next/server"

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600))

  const metrics = {
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
      change: '+15% from "+15% from yesterday',
      trend: "up",
    },
    network: {
      value: "500 MB/s",
      change: "+18% from yesterday",
      trend: "up",
    },
  }

  return NextResponse.json(metrics)
}
