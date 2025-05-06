import type { ReactNode } from "react"
import { Sidebar } from "@/components/layout/sidebar"

interface PageLayoutProps {
  children: ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#0a2a3f]">
      <Sidebar />
      <div className="flex-1 bg-[#a7bbc7] p-3 sm:p-4 overflow-y-auto ml-[70px] lg:ml-0">
        {/* Reduce the top padding from pt-12 to pt-8 to minimize the gap */}
        <div className="pt-0">{children}</div>
      </div>
    </div>
  )
}
