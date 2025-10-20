import { Link, Outlet, useNavigate } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import Logo from "@/components/Logo";
import NavMenu from "@/components/NavMenu";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout() {
    const { data, isError, isLoading } = useAuth();
    const navigate = useNavigate();

    if (isError) {
        navigate("/auth/login");
    }

    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center h-screen">
                    <p className="text-5xl font-bold">Cargando...</p>
                </div>
            </>
        );
    }

    if (data) {
        return (
            <>
                <header className="bg-gray-800 py-5">
                    <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                        <div className="w-64">
                            <Link to={"/"}>
                                <Logo />
                            </Link>
                        </div>

                        <NavMenu userName={data.userName} />
                    </div>
                </header>

                <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                    <Outlet />
                </section>

                <footer className="py-5">
                    <p className="text-center">
                        Todos los derechos reservados {new Date().getFullYear()}
                    </p>
                </footer>

                <ToastContainer
                    pauseOnHover={false}
                    transition={Slide}
                    autoClose={2500}
                />
            </>
        );
    }
}
