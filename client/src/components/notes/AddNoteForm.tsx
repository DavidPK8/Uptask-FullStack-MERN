import type { NoteFormData } from "@/types/index";
import { useForm } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/api/NoteAPI";
import { toast } from "react-toastify";
import { useLocation, useParams } from "react-router-dom";

export default function AddNoteForm() {
    const params = useParams();
    const projectID = params.projectID!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("viewTask")!;

    const queryClient = useQueryClient();

    const initialValues: NoteFormData = {
        content: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: initialValues,
    });

    const { mutate } = useMutation({
        mutationFn: createNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data?.msg) {
                toast.success(data.msg);
            }

            queryClient.invalidateQueries({
                queryKey: ["task", taskID],
            });
            reset();
        },
    });

    const handleAddNote = (formData: NoteFormData) => {
        const data = {
            formData,
            projectID,
            taskID,
        };

        mutate(data);
    };

    return (
        <form
            onSubmit={handleSubmit(handleAddNote)}
            className="space-y-3"
            noValidate
        >
            <div className="flex flex-col gap-2">
                <label className="font-bold" htmlFor="content">
                    Crear Nota
                </label>

                <input
                    id="content"
                    type="text"
                    placeholder="Contenido de la nota"
                    className="w-full p-3 border border-gray-300"
                    {...register("content", {
                        required: "El Contenido de la nota es obligatorio",
                    })}
                />
                {errors.content && (
                    <ErrorMessage>{errors.content.message}</ErrorMessage>
                )}
            </div>

            <input
                type="submit"
                value="Crear Nota"
                className="bg-fuchsia-600 hover:bg-fuchsia-700 w-full p-2 text-white font-bold cursor-pointer"
            />
        </form>
    );
}
