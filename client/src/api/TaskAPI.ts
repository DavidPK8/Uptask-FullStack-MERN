import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Project, TaskFormData } from "../types";

type TaskAPI = {
    formData: TaskFormData;
    projectID: Project["_id"];
};

export async function createTask({ formData, projectID }: TaskAPI) {
    try {
        const url = `/projects/${projectID}/tasks`;
        const { data } = await api.post(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
