"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  className?: string
}

export function Pagination({ currentPage, totalPages, onPageChange, className }: PaginationProps) {
  // Don't render pagination if there's only one page
  if (totalPages <= 1) return null

  // Calculate which page numbers to show
  const getPageNumbers = () => {
    const pages = []

    // Always show first page
    pages.push(1)

    // Calculate range around current page
    const rangeStart = Math.max(2, currentPage - 1)
    const rangeEnd = Math.min(totalPages - 1, currentPage + 1)

    // Add ellipsis after first page if needed
    if (rangeStart > 2) {
      pages.push("ellipsis-start")
    }

    // Add pages in range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i)
    }

    // Add ellipsis before last page if needed
    if (rangeEnd < totalPages - 1) {
      pages.push("ellipsis-end")
    }

    // Always show last page if more than one page
    if (totalPages > 1) {
      pages.push(totalPages)
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <nav aria-label="Pagination" className={cn("flex items-center justify-center", className)}>
      <ul className="flex items-center gap-1 sm:gap-2">
        {/* Previous button */}
        <li>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
        </li>

        {/* Page numbers - desktop */}
        <div className="hidden sm:flex sm:items-center sm:gap-1">
          {pageNumbers.map((page, index) => {
            if (page === "ellipsis-start" || page === "ellipsis-end") {
              return (
                <li key={`${page}-${index}`}>
                  <PaginationEllipsis />
                </li>
              )
            }

            return (
              <li key={`page-${page}`}>
                <PaginationItem page={page as number} currentPage={currentPage} onPageChange={onPageChange} />
              </li>
            )
          })}
        </div>

        {/* Mobile page indicator */}
        <li className="flex items-center sm:hidden">
          <span className="text-sm font-medium px-2 py-1 bg-white rounded-md border border-gray-200 shadow-sm">
            {currentPage} / {totalPages}
          </span>
        </li>

        {/* Next button */}
        <li>
          <PaginationNext
            onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </li>
      </ul>
    </nav>
  )
}

interface PaginationItemProps {
  page: number
  currentPage: number
  onPageChange: (page: number) => void
}

export function PaginationItem({ page, currentPage, onPageChange }: PaginationItemProps) {
  return (
    <PaginationLink
      onClick={() => onPageChange(page)}
      className={cn(
        "flex h-9 min-w-[2.25rem] items-center justify-center rounded-md text-sm font-medium transition-colors",
        currentPage === page
          ? "bg-white text-[#0a2a3f] border-2 border-[#0a2a3f] shadow-sm"
          : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-sm",
      )}
      aria-current={currentPage === page ? "page" : undefined}
    >
      {page}
    </PaginationLink>
  )
}

export function PaginationLink({ className, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent data-[active]:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

export function PaginationContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("flex w-full items-center justify-center gap-2", className)} {...props} />
}

export function PaginationEllipsis() {
  return <span className="flex h-9 w-9 items-center justify-center text-gray-500">&#8230;</span>
}

interface PaginationPreviousProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}

export function PaginationPrevious({ onClick, disabled }: PaginationPreviousProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        disabled
          ? "cursor-not-allowed bg-gray-100 text-gray-400"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm",
      )}
      aria-label="Previous page"
    >
      <ChevronLeft className="h-4 w-4" />
    </button>
  )
}

interface PaginationNextProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: () => void
  disabled: boolean
}

export function PaginationNext({ onClick, disabled }: PaginationNextProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        disabled
          ? "cursor-not-allowed bg-gray-100 text-gray-400"
          : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm",
      )}
      aria-label="Next page"
    >
      <ChevronRight className="h-4 w-4" />
    </button>
  )
}
