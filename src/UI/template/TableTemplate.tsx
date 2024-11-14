'use client'

import React, { useState } from 'react';
import TableProjects from '../organims/TableProjects';
import { IPostProject, IResponseUser, IResponsProjects } from '@/app/core/application/dto';
import ContainerCard from '../organims/ContainerCard';
import { ProjectModal } from '@/UI/molecules/NewProject';
import NavBarClient from '../molecules/NavBar';
import { ProjectsService } from '@/app/infractrusture/services/projects.service';
import Pagination from '../molecules/Pagination';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface dataProps {
    dataP: IResponsProjects;
    dataU: IResponseUser,
}

export default function TableTemplate({ dataP, dataU }: dataProps) {
    const [selectedProject, setSelectedProject] = useState<IPostProject | null>(null);
    const [selectedProjectId, setSelectedProjectId] = useState<number | null>(null); // Guardar el id del proyecto seleccionado
    const [isModalOpen, setIsModalOpen] = useState(false);

    const router = useRouter();

    const useProjectsService = new ProjectsService();

    const handleOpenModal = (id?: number) => {
        if (id) {
            const project = dataP.data.find((item) => item.id === id);
            if (project) {
                const projectData: IPostProject = {
                    title: project.title,
                    description: project.description,
                    startDate: project.startDate,
                    endDate: project.endDate,
                };
                setSelectedProject(projectData);
                setSelectedProjectId(id); // Guardar el id del proyecto seleccionado
            }
        } else {
            setSelectedProject(null);
            setSelectedProjectId(null); // Resetear el id si no hay proyecto
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedProject(null);
        setSelectedProjectId(null); // Resetear el id al cerrar el modal
    };

    const handleSubmit = async (formData: IPostProject) => {
        try {
            if (selectedProjectId) {
                // Enviar el id en la petición al actualizar
                await useProjectsService.save(formData, selectedProjectId);
                console.log("Project updated successfully");
                toast.success("The project was updated")
                router.refresh()
            } else {
                // Crear un nuevo proyecto si no hay id
                await useProjectsService.create(formData);
                console.log("Project created successfully");
                toast.success("The project was created")
                router.refresh()
            }
        } catch (error) {
            console.error("Error saving project:", error);
            toast.error("Error saving project")
        }
    };

    const handleDelete = async (id: number) => {
        try {
            await useProjectsService.destroy(id);
            console.log("Project deleted successfully");
            toast.success("The project was deleted")
            router.refresh() // Actualiza la página para ver los cambios en tiempo real (sin recargar la página completa)  // Requiere Next.js 11.0.0+  // Requiere react-router-dom 6.0.0+  // Para ver los cambios en tiempo real, puede utilizar el hook useRouter().refresh() en lugar de router.refresh()  // Nota: Este hook no funcionará con Next
        } catch (error) {
            console.error("Error deleting project:", error);
            toast.error("Error deleting project")
        }
    };

    return (
        <div className='mb-4'>
            <NavBarClient onAdd={() => handleOpenModal()} />
            <ContainerCard dataP={dataP} dataU={dataU.data} />
            <TableProjects
                data={dataP.data}
                onEdit={(id) => handleOpenModal(id)} // Llama a handleOpenModal con el id
                onDelete={handleDelete} // Pasa el id al eliminar
            />
            <ProjectModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onSubmit={handleSubmit} // handleSubmit ahora maneja correctamente el id
                initialData={selectedProject}
            />
            <Pagination data={dataP} />
        </div>
    );
}
