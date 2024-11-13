import React from 'react'
import Card from '../molecules/Card'
import { FaRegFolderOpen } from "react-icons/fa6";

export default function ContainerCard() {
    

    return (
        <div className='grid grid-cols-4 m-6 gap-5'>
            <Card data={3} title="Total Proyectos" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
            <Card data={3} title="Proyectos Activos" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
            <Card data={3} title="Organizadores" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
            <Card data={3} title="Proximon Proyecto" icon={<FaRegFolderOpen className="text-[1.4em]" />} />
        </div>
    )
}
