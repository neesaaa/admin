import type { ReactNode } from "react"
import { Sidebar } from "@/components/layout/sidebar"

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex h-screen bg-[#0a2a3f]">
      <Sidebar />
      <div className="flex-1 bg-[#a7bbc7] p-4 overflow-y-auto">{children}</div>
    </div>
  )
}
