import { SectionContainer } from "@/components/ui/section-container"
import { UserListItem } from "@/components/ui/user-list-item"
import { ChevronRight } from "lucide-react"
import Link from "next/link"

interface UsersSectionProps {
  className?: string
}

export function UsersSection({ className = "" }: UsersSectionProps) {
  // Mock data for users
  const users = [
    {
      id: 1,
      name: "Olivia Martin",
      status: "Active",
      projects: 18,
    },
    {
      id: 2,
      name: "Jackson Lee",
      status: "Active",
      projects: 12,
    },
    {
      id: 3,
      name: "Isabella Nguyen",
      status: "Active",
      projects: 8,
    },
    {
      id: 4,
      name: "William Kim",
      status: "Active",
      projects: 15,
    },
  ]

  return (
    <SectionContainer
      title="Users"
      description="Recent users in your platform"
      className={className}
      action={
        <Link href="/pages/users">
          <button className="flex items-center text-sm text-black hover:text-white ">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </button>
        </Link>
      }
    >
      <div className="overflow-hidden rounded-lg bg-[#0a2a3f] text-white">
        <div className="grid grid-cols-12 gap-2 p-4 font-medium">
          <div className="col-span-6 md:col-span-4">User</div>
          <div className="hidden md:block md:col-span-4">Status</div>
          <div className="col-span-4 md:col-span-3 flex justify-start md:justify-center">Projects</div>
          <div className="col-span-2 md:col-span-1"></div>
        </div>

        {users.map((user) => (
          <UserListItem key={user.id} id={user.id} name={user.name} status={user.status} projects={user.projects} />
        ))}
      </div>
    </SectionContainer>
  )
}
