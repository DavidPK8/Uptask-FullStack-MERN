import { isAxiosError } from "axios";
import api from "@/lib/axios";
import {
    taskSchema,
    type Project,
    type Task,
    type TaskFormData,
    type TaskResponse,
} from "../types";

type TaskAPI = {
    formData: TaskFormData;
    projectID: Project["_id"];
    taskID: Task["_id"];
    status: Task["status"];
};

export async function createTask({
    formData,
    projectID,
}: Pick<TaskAPI, "formData" | "projectID">) {
    try {
        const url = `/projects/${projectID}/tasks`;
        const { data } = await api.post<TaskResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function getTaskByID({
    projectID,
    taskID,
}: Pick<TaskAPI, "projectID" | "taskID">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}`;
        const { data } = await api<TaskResponse>(url);
        const response = taskSchema.safeParse(data.task);

        if (response.success) {
            return response.data;
        }
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateTask({
    formData,
    projectID,
    taskID,
}: Pick<TaskAPI, "formData" | "projectID" | "taskID">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}`;
        const { data } = await api.put<TaskResponse>(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function deleteTask({
    projectID,
    taskID,
}: Pick<TaskAPI, "projectID" | "taskID">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}`;
        const { data } = await api.delete<TaskResponse>(url);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updateStatus({
    projectID,
    taskID,
    status,
}: Pick<TaskAPI, "projectID" | "taskID" | "status">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}/status`;
        const { data } = await api.post<TaskResponse>(url, { status });
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
