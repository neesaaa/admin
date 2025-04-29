"use client"

import logo from "@/assets/Mask group.png"
import { cn } from "@/lib/utils"
import { FolderKanban, LayoutDashboard, LogOut, Server, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    {
      title: "Admin1",
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
    // Empty placeholder items for the design
    { title: "", href: "#", icon: () => <div className="h-4" />, disabled: true },
    { title: "", href: "#", icon: () => <div className="h-4" />, disabled: true },
    { title: "", href: "#", icon: () => <div className="h-4" />, disabled: true },
  ]

  return (
    <div className="flex h-screen w-[150px] flex-col bg-[#0a2a3f] text-white md:w-[200px]"> 
      <div className="p-4">
        <Image
          src={logo}
          alt="Company Logo"
          priority
        />
      </div>

      <div className="flex-1 space-y-2 p-2">
        {navItems.map((item, index) =>
          item.disabled ? (
            <div
              key={index}
              className={cn("flex items-center rounded-md px-3 py-2 text-sm", item.title ? "text-gray-400" : "h-4")}
            >
              {item.icon && <item.icon className="mr-2 h-5 w-5" />}
              {item.title}
            </div>
          ) : (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                pathname === item.href
                  ? "bg-[#1a3a4f] text-white"
                  : "text-gray-300 hover:bg-[#1a3a4f] hover:text-white",
              )}
            >
              {item.icon && <item.icon className="mr-2 h-5 w-5" />}
              {item.title}
            </Link>
          ),
        )}
      </div>

      <div className="p-2">
        <Link
          href="#"
          className="flex items-center rounded-md px-3 py-2 text-sm text-gray-300 hover:bg-[#1a3a4f] hover:text-white"
        >
          <LogOut className="mr-2 h-5 w-5" />
          Log Out
        </Link>
      </div>

      <div className="p-2">
        <div className="h-12"></div>
      </div>
    </div>
  )
}
