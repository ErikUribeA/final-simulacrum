'use client'
import { IProject } from '@/app/core/application/dto';
import { Button, Input } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import './styles/table.sass';
import { IoMdArrowDropleftCircle } from "react-icons/io";
import { IoMdArrowDroprightCircle } from "react-icons/io";



interface TableProps {
    data: IProject[];
}

export default function TableProjects({ data }: TableProps) {
    // Estado de paginación
    const [currentPage, setCurrentPage] = useState(1);
    const [projects, setProjects] = useState<IProject[]>([]);
    const itemsPerPage = 5;

    const indexOfLastProject = currentPage * itemsPerPage;
    const indexOfFirstProject = indexOfLastProject - itemsPerPage;
    const currentProjects = data.slice(indexOfFirstProject, indexOfLastProject);

    useEffect(() => {
        setProjects(currentProjects);
    }, [currentPage, currentProjects, data]);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(data.length / itemsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="m-5 bg-white flex flex-col gap-8 rounded-md">
            <div className="px-8 pt-6">
                <h2 className="font-bold text-[1.4em]">Lista de Proyectos</h2>
            </div>

            {/* Parte de búsqueda */}
            <div className="px-8 flex justify-between">
                <Input placeholder="Buscar Proyectos..." sx={{ width: '37%', padding: '10px' }} />
                <div className="flex justify-center gap-4 pt-4 items-center">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>
                        <IoMdArrowDropleftCircle className='text-[2em]' />
                    </button>
                    <span>{`Página ${currentPage} de ${Math.ceil(data.length / itemsPerPage)}`}</span>
                    <button
                        onClick={handleNextPage}
                        disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
                        className={`isDisabled ? ' `}
                    >
                        <IoMdArrowDroprightCircle className='text-[2em]' />

                    </button>
                </div>
            </div>

            {/* Tabla */}
            <table className="w-full border-collapse">
                <thead className="hidden md:table-header-group">
                    <tr className="border-b-[1px] border-gray-200 text-gray-400">
                        <th className="Th">Titulo</th>
                        <th className="Th">Descripcion</th>
                        <th className="Th">Fecha de Inicio</th>
                        <th className="Th">Fecha de Fin</th>
                        <th className="Th">Estado</th>
                        <th className="Th">Organizador</th>
                        <th className="Th">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) => (
                        <tr
                            key={index}
                            className="block md:table-row border-b-[1px] border-gray-200 p-4"
                        >
                            <td className="Td" data-label="Titulo">
                                <span className="Span">Titulo:</span> {project.title}
                            </td>
                            <td className="Td" data-label="Descripcion">
                                <span className="Span">Descripcion:</span> {project.description}
                            </td>
                            <td className="Td" data-label="Fecha de Inicio">
                                <span className="Span">Fecha de Inicio:</span> {project.startDate}
                            </td>
                            <td className="Td" data-label="Fecha de Fin">
                                <span className="Span">Fecha de Fin:</span>{' '}
                                {project.endDate ? project.endDate : 'Sin fecha'}
                            </td>
                            <td className="Td" data-label="Estado">
                                <span className="Span">Estado:</span>
                                <div
                                    className={`${project.isActive ? 'bg-green-300 text-green-800' : 'bg-red-300 text-red-800'
                                        } rounded-xl p-1 text-center`}
                                >
                                    {project.isActive ? 'Activo' : 'Inactivo'}
                                </div>
                            </td>

                            <td className="Td" data-label="Organizador">
                                <span className="Span">Organizador:</span> {project.organizer.name}
                            </td>
                            <td className="Td" data-label="Acciones">
                                <span className="Span">Acciones:</span>
                                <div className="flex gap-2">
                                    <Button variant="outlined" color="neutral">
                                        Editar
                                    </Button>
                                    <Button variant="soft" color="danger">
                                        Eliminar
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Paginación */}

        </div>
    );
}
