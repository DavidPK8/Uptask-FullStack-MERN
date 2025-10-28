import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { NoteFormData, NoteResponse, Project, Task } from "../types";

type NoteAPIType = {
    formData: NoteFormData;
    projectID: Project["_id"];
    taskID: Task["_id"];
};

export async function createNote({
    formData,
    projectID,
    taskID,
}: Pick<NoteAPIType, "formData" | "projectID" | "taskID">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}/notes`;
        const { data } = await api.post<NoteResponse>(url, formData);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error
            );
        }
    }
}
