import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <h1 className="bg-blue-700">Hola Mundo</h1>
    </StrictMode>
);
