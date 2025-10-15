import api from "@/lib/axios";
import { isAxiosError } from "axios";
import type {
    AuthResponse,
    ConfirmToken,
    ForgotPasswordForm,
    NewPasswordForm,
    RequestConfirmationCodeForm,
    UserLoginForm,
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

export async function requestCode(email: RequestConfirmationCodeForm) {
    try {
        const url = "/auth/request-code";
        const { data } = await api.post<AuthResponse>(url, email);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function authenticateUser(formData: UserLoginForm) {
    try {
        const url = "/auth/login";
        const { data } = await api.post<AuthResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function forgotPassword(formData: ForgotPasswordForm) {
    try {
        const url = "/auth/forgot-password";
        const { data } = await api.post<AuthResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function validateToken(token: ConfirmToken) {
    try {
        const url = "/auth/validate-token";
        const { data } = await api.post<AuthResponse>(url, token);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}

export async function updatePasswordWithToken({
    formData,
    token,
}: {
    formData: NewPasswordForm;
    token: ConfirmToken["token"];
}) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<AuthResponse>(url, formData);
        return data;
    } catch (error) {
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.error);
        }
    }
}
