import { Link } from "react-router-dom";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import type { ConfirmToken } from "@/types/index";

export default function ConfirmAccountView() {
    const [token, setToken] = useState<ConfirmToken["token"]>("");

    const handleChange = (token: ConfirmToken["token"]) => {
        setToken(token);
    };

    const handleComplete = (token: ConfirmToken["token"]) => {
        console.log(`Completado: ${token}`);
    };

    const handleClear = () => {
        setToken("");
    };

    return (
        <>
            <h1 className="text-5xl font-black text-white">
                Confirma tu Cuenta
            </h1>
            <p className="text-2xl font-light text-white mt-5">
                Ingresa el código que recibiste {""}
                <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
            </p>
            <form className="space-y-8 p-10 bg-white mt-10">
                <label className="font-normal text-2xl text-center block">
                    Código de 6 dígitos
                </label>
                <div className="flex justify-center gap-4 items-center">
                    <PinInput
                        value={token}
                        onChange={handleChange}
                        onComplete={handleComplete}
                    >
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                        <PinInputField className="w-10 h-10 p-3 rounded-lg border-gray-300 border placeholder-white" />
                    </PinInput>

                    <div className="relative group inline-block">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="icon icon-tabler icons-tabler-outline icon-tabler-x cursor-pointer"
                            onClick={handleClear}
                        >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M18 6l-12 12" />
                            <path d="M6 6l12 12" />
                        </svg>

                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap shadow-lg">
                            Limpiar Código
                        </span>
                    </div>
                </div>
            </form>

            <nav className="mt-10 flex flex-col space-y-4">
                <Link
                    to="/auth/new-code"
                    className="text-center text-gray-300 font-normal"
                >
                    Solicitar un nuevo Código
                </Link>
            </nav>
        </>
    );
}
