import NewPasswordForm from "@/components/auth/NewPasswordForm";
import NewPasswordToken from "@/components/auth/NewPasswordToken";
import { useState } from "react";

export default function NewPasswordView() {
    const [isValidToken, setIsValidToken] = useState(false);

    return (
        <>
            <h1 className="text-5xl font-black text-white text-center">
                Reestablecer Password
            </h1>
            <p className="text-2xl font-light text-white mt-5 text-center">
                Ingresa el código que recibiste {""}
                <span className=" text-fuchsia-500 font-bold"> por email</span>
            </p>

            {!isValidToken ? <NewPasswordToken /> : <NewPasswordForm />}
        </>
    );
}
