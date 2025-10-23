import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Project, ProjectTeamResponse, TeamMemberForm } from "../types";

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

        console.log(data.user);
        return data.user;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(
                error.response.data.message || error.response.data.error
            );
        }
    }
}
