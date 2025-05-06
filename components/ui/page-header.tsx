import type { ReactNode } from "react"

interface PageHeaderProps {
  title: string
  description?: string
  children?: ReactNode
}

export function PageHeader({ title, description, children }: PageHeaderProps) {
  return (
    <div className="mb-3 sm:mb-4 flex flex-col justify-between gap-2 md:flex-row md:items-center md:gap-4">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-black">{title}</h1>
        {description && <p className="text-sm text-gray-700">{description}</p>}
      </div>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  )
}
