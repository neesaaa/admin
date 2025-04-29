import type { ReactNode } from "react"

interface SectionContainerProps {
  title: string
  description?: string
  children: ReactNode
  className?: string
  action?: ReactNode
}

export function SectionContainer({ title, description, children, className = "", action }: SectionContainerProps) {
  return (
    <div className={`rounded-lg bg-[#a7bbc7] p-3 sm:p-4 ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-black">{title}</h2>
          {description && <p className="text-xs sm:text-sm text-gray-700">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  )
}
