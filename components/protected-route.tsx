"use client"

import type React from "react"

import { useAuth } from "@/components/auth/auth-context"
import { Loader2 } from "lucide-react"
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react"

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    // If no user is logged in and we're not already on the login page, redirect to login
    if (!user && pathname !== "/login") {
      router.push("/login")
    }
  }, [user, router, pathname])

  // If we're not on the login page and there's no user, show loading
  if (!user && pathname !== "/login") {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#0a2a3f]">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-white" />
          <p className="mt-4 text-white">Loading...</p>
        </div>
      </div>
    )
  }

  // If user is logged in or we're on the login page, render children
  return <>{children}</>
}
