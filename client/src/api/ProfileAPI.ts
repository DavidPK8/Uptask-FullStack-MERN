import { isAxiosError } from "axios";
import type {
    ProfileResponse,
    UpdatePasswordForm,
    UserProfileForm,
} from "../types";
import api from "@/lib/axios";

export async function updateProfile(formData: UserProfileForm) {
    try {
        const { data } = await api.put<ProfileResponse>(
            "/auth/profile",
            formData
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePassword(formData: UpdatePasswordForm) {
    try {
        const { data } = await api.post<ProfileResponse>(
            "/auth/update-password",
            formData
        );

        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
