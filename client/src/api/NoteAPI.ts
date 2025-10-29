import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type { Note, NoteFormData, NoteResponse, Project, Task } from "../types";

type NoteAPIType = {
    formData: NoteFormData;
    projectID: Project["_id"];
    taskID: Task["_id"];
    noteID: Note["_id"];
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

export async function deleteNote({
    projectID,
    taskID,
    noteID,
}: Pick<NoteAPIType, "projectID" | "taskID" | "noteID">) {
    try {
        const url = `/projects/${projectID}/tasks/${taskID}/notes/${noteID}`;
        const { data } = await api.delete<NoteResponse>(url);

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error
            );
        }
    }
}
