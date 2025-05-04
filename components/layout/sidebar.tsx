"use client"
import logo from "@/assets/Mask group.png";
import { useAuth } from "@/components/auth/auth-context";
import { cn } from "@/lib/utils";
import { FolderKanban, LayoutDashboard, LogOut, Menu, Server, User, Users, X } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
      title: user?.name || "Admin",
      href: "#",
      icon: User,
      disabled: true,
    },
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

  return (
    <>
      {/* Mobile menu toggle button - positioned outside the sidebar */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-[#0a2a3f] text-white p-2 rounded-md shadow-md"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Overlay for mobile when sidebar is open */}
      {isMobile && isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30" onClick={() => setIsOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed lg:relative h-screen bg-[#0a2a3f] text-white z-40 transition-all duration-300 flex flex-col",
          isOpen ? "w-[200px]" : "w-0 lg:w-[70px]",
          "overflow-hidden",
        )}
      >
        {/* Logo area with extra padding on mobile to avoid overlap with toggle button */}
        <div className={cn("flex items-center justify-between", isMobile ? "pt-14 px-4 pb-4" : "p-4")}>
          <div className={cn("transition-opacity duration-300", !isOpen && "lg:opacity-0")}>
            <Image
            src={logo}
            alt="Company Logo"
            priority
          />
          </div>
          {/* Desktop toggle button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:block text-white"
            aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Navigation items - flex-grow to push logout to bottom */}
        <div className="flex-1 space-y-2 p-2 overflow-y-auto">
          {navItems.map((item, index) =>
            item.disabled ? (
              <div
                key={index}
                className={cn("flex items-center rounded-md px-3 py-2 text-sm", item.title ? "text-gray-400" : "h-4")}
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

        {/* Spacer to push logout to bottom */}
        <div className="mt-auto"></div>

        {/* Logout button - at the very bottom */}
        <div className="p-4 border-t border-[#1a3a4f]">
          <button
            onClick={logout}
            className="flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[#1a3a4f] hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-2">Log Out</span>}
          </button>
        </div>
      </div>
    </>
  )
}
