"use client"
import { usePathname, useRouter } from "next/navigation"
import logo from "@/assets/Mask group.png";
import Image from "next/image";


import { cn } from "@/lib/utils"
import {
  LogOut,
  LayoutDashboard,
  Server,
  FolderKanban,
  Menu,
  ChevronRight,
  ChevronLeft,
  Users,
  Github,
  Mail,
} from "lucide-react"
import { useState, useEffect } from "react"
import { Logo } from "@/assets/logo"
import { useAuth } from "@/components/auth/auth-context"

export function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const { user, logout } = useAuth()

  // Check if we're on mobile and set sidebar state accordingly
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setIsOpen(false)
      } else {
        setIsOpen(true)
      }
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Handle navigation with proper sidebar closing
  const handleNavigation = (href: string) => {
    if (isMobile) {
      // Close sidebar first, then navigate
      setIsOpen(false)

      // Use setTimeout to ensure the sidebar closes before navigation
      // This prevents the open-close-open behavior
      setTimeout(() => {
        router.push(href)
      }, 10)
    } else {
      router.push(href)
    }
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/pages/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Server",
      href: "/pages/server",
      icon: Server,
    },
    {
      title: "Projects",
      href: "/pages/projects",
      icon: FolderKanban,
    },
    {
      title: "Users",
      href: "/pages/users",
      icon: Users,
    },
    // Empty placeholder items for the design
    { title: "", href: "#", icon: () => <div className="h-4" />, disabled: true },
    { title: "", href: "#", icon: () => <div className="h-4" />, disabled: true },
  ]

  // Toggle sidebar function
  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Mobile menu toggle button - positioned outside the sidebar when closed */}
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#0a2a3f] text-white p-2 rounded-md shadow-md"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar - added box-shadow on mobile */}
      <div
        className={cn(
          "fixed lg:sticky top-0 h-screen bg-[#0a2a3f] text-white z-40 transition-all duration-300 flex flex-col",
          isOpen ? "w-[200px]" : "w-[70px]", // Always show at least 70px width for icons
          "overflow-hidden",
          isMobile && "shadow-lg", // Added shadow on mobile for better separation
        )}
      >
        {/* Logo area with toggle button */}
        <div className={cn("flex items-center justify-between p-4", !isOpen && "justify-center")}>
          <div className={cn("transition-opacity duration-300", !isOpen && "opacity-0")}>
            <Image
              src={logo}
              alt="Company Logo"
              priority
            />
          </div>

          {/* Toggle button - visible on both mobile and desktop */}
          <button
            onClick={toggleSidebar}
            className={cn(
              "text-white p-1 rounded-md hover:bg-[#1a3a4f] transition-colors",
              !isOpen && "absolute right-2 top-4",
            )}
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* User info section */}
        <div className={cn("flex items-center px-3 py-2 border-b border-[#1a3a4f] mb-2", !isOpen && "justify-center")}>
          {user?.avatarUrl ? (
            <img src={user.avatarUrl || "/placeholder.svg"} alt={user.name} className="h-8 w-8 rounded-full" />
          ) : (
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1a3a4f] text-white">
              {user?.name?.charAt(0) || "U"}
            </div>
          )}

          {isOpen && (
            <div className="ml-2 overflow-hidden">
              <div className="text-sm font-medium truncate">{user?.name || "Admin"}</div>
              <div className="flex items-center text-xs text-gray-400">
                {user?.provider === "github" ? (
                  <>
                    <Github size={12} className="mr-1" />
                    <span>GitHub</span>
                  </>
                ) : (
                  <>
                    <Mail size={12} className="mr-1" />
                    <span>Email</span>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation items - flex-grow to push logout to bottom */}
        <div className="flex-1 space-y-2 p-2 overflow-y-auto">
          {navItems.map((item, index) =>
            item.disabled ? (
              <div
                key={index}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm",
                  item.title ? "text-gray-400" : "h-4",
                  !isOpen && "justify-center",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {isOpen && <span className="ml-2">{item.title}</span>}
              </div>
            ) : (
              <button
                key={index}
                onClick={() => handleNavigation(item.href)}
                className={cn(
                  "flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors text-left",
                  !isOpen && "justify-center",
                  pathname === item.href
                    ? "bg-[#1a3a4f] text-white"
                    : "text-gray-300 hover:bg-[#1a3a4f] hover:text-white",
                )}
              >
                {item.icon && <item.icon className="h-5 w-5" />}
                {isOpen && <span className="ml-2">{item.title}</span>}
              </button>
            ),
          )}
        </div>

        {/* Logout button - at the very bottom */}
        <div className="mt-auto p-4 border-t border-[#1a3a4f]">
          <button
            onClick={logout}
            className={cn(
              "flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[#1a3a4f] hover:text-white transition-colors",
              !isOpen && "justify-center",
            )}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-2">Log Out</span>}
          </button>
        </div>
      </div>
    </>
  )
}
