"use client"

import { PageLayout } from "@/components/layout/page-layout"
import { ProjectsList } from "@/components/projects/projects-list"

export function ProjectsView() {
  return (
    <PageLayout>
      <ProjectsList />
    </PageLayout>
  )
}
