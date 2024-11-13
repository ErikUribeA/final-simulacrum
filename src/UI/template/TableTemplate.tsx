import React from 'react'
import TableProjects from '../organims/TableProjects'
import { IResponsProjects } from '@/app/core/application/dto';
import NavBar from '../molecules/NavBar';
import ContainerCard from '../organims/ContainerCard';

interface dataProps {
    data: IResponsProjects
}

export default function TableTemplate({data} : dataProps) {
    return (
        <>
            <NavBar />
            <ContainerCard />
            <TableProjects data={data.data} />
        </>
    )
}
