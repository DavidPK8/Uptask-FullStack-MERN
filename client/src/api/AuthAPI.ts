import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
    AuthResponse,
    ConfirmToken,
    UserRegistrationForm,
} from "../types";

export async function createAccount(formData: UserRegistrationForm) {
    try {
        const url = "/auth/create-account";
        const { data } = await api.post<AuthResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function confirmAccount(token: ConfirmToken) {
    try {
        const url = "/auth/confirm-account";
        const { data } = await api.post<AuthResponse>(url, token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
