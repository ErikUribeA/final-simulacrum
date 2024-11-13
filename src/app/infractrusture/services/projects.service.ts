import { IResponsProjects } from "@/app/core/application/dto";
import { HttpClient } from "../utils/client-http";

export class ProjectsService {
    private httpClient: HttpClient;

    constructor() {
        this.httpClient = new HttpClient()
    }

    async findAll(): Promise<IResponsProjects> {
        try {
            const response = await this.httpClient.get<IResponsProjects>(`projects`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
/* 
    async create(service: IPostService) {
        try {
            const response = await fetch(`/api/services/create/services`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    
    async destroy(id: number) {
        try {
            const response = await fetch(`/api/services/destroy/services/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async save(service: IPostService, id: number) {
        try {
            const response = await fetch(`/api/services/save/services/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(service),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error(error);
            throw error;
        }
    } */
}