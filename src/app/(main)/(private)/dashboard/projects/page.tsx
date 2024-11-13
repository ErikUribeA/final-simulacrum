
import { ProjectsService } from '@/app/infractrusture/services/projects.service'
import TableTemplate from '@/UI/template/TableTemplate'
import React from 'react'

const useProjectsService = new ProjectsService()

export default async function ProjectsPage() {
  const data = await useProjectsService.findAll()

  return (
    <TableTemplate data={data} />
  )
}
