import React from 'react'
import Card from '../molecules/Card'
import { FaRegFolderOpen } from "react-icons/fa6";
import { GiNetworkBars } from "react-icons/gi";
import { LuUsers } from "react-icons/lu";
import { FiCalendar } from "react-icons/fi";
import { IResponsProjects, IUser } from '@/app/core/application/dto';

interface cardProps{
    dataP: IResponsProjects
    dataU: IUser[]
}

export default function ContainerCard( {dataP, dataU} : cardProps ) {

    return (
        <div className='grid grid-cols-4 m-6 gap-5'>
            <Card data={dataP.metadata.totalItems} title="Total Proyectos" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
            <Card data={dataP.metadata.totalItems} title="Proyectos Activos" icon={<GiNetworkBars className="text-[1.4em]" />} />
            <Card data={dataU.length} title="Organizadores" icon={<LuUsers className="text-[1.4em]" />} />
            <Card data={3} title="Proximon Proyecto" icon={<FiCalendar className="text-[1.4em]" />} />
        </div>
    )
}
