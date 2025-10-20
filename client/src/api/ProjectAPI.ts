import {
    dashboardProjectSchema,
    type Project,
    type ProjectFormData,
    type ProjectResponse,
} from "@/types/index";
import api from "@/lib/axios";
import { isAxiosError } from "axios";

export async function createProject(formData: ProjectFormData) {
    try {
        const { data } = await api.post<ProjectResponse>("/projects", formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjects() {
    const token = localStorage.getItem("AUTH_TOKEN");

    try {
        const { data } = await api<ProjectResponse>("/projects", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const response = dashboardProjectSchema.safeParse(data.projects);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getProjectByID(projectID: Project["_id"]) {
    try {
        const { data } = await api<ProjectResponse>(`/projects/${projectID}`);

        return data.project;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

type ProjectAPIType = {
    formData: ProjectFormData;
    projectID: Project["_id"];
};

export async function updateProject({ formData, projectID }: ProjectAPIType) {
    try {
        const { data } = await api.put<ProjectResponse>(
            `/projects/${projectID}`,
            formData
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteProject(projectID: Project["_id"]) {
    try {
        const { data } = await api.delete<ProjectResponse>(
            `/projects/${projectID}`
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
