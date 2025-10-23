import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type {
    Project,
    ProjectTeamResponse,
    TeamMember,
    TeamMemberForm,
} from "../types";

export async function findUserByEmail({
    formData,
    projectID,
}: {
    formData: TeamMemberForm;
    projectID: Project["_id"];
}) {
    try {
        const url = `/projects/${projectID}/team/find`;
        const { data } = await api.post<ProjectTeamResponse>(url, formData);

        return data.user;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error
            );
        }
    }
}

export async function addUserToProject({
    id,
    projectID,
}: {
    id: TeamMember["_id"];
    projectID: Project["_id"];
}) {
    try {
        const url = `/projects/${projectID}/team`;
        const { data } = await api.post<ProjectTeamResponse>(url, { id });

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error
            );
        }
    }
}
