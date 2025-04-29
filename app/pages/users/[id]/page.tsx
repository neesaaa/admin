export default async function UserDetailsPage({ params }: { params: { id: string } }) {
  // In Next.js App Router, we need to await params or make the component async
  // to properly handle dynamic parameters
  return <UserDetailsView userId={params.id} />
}

// Import needs to be after the component definition when using 'use client' components
// in a Server Component
import { UserDetailsView } from "@/components/users/user-details-view"
