import { deleteNote } from "@/api/NoteAPI";
import { useAuth } from "@/hooks/useAuth";
import type { Note } from "@/types/index";
import { formatDate } from "@/utils/utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type NoteDetailProps = {
    note: Note;
};

export default function NoteDetail({ note }: NoteDetailProps) {
    const { data, isLoading } = useAuth();

    const canDelete = useMemo(
        () => data?._id === note.createdBy._id,
        [data?._id, note.createdBy._id]
    );

    const params = useParams();
    const projectID = params.projectID!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("viewTask")!;

    const queryClient = useQueryClient();

    const { mutate } = useMutation({
        mutationFn: deleteNote,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data?.msg) {
                toast.success(data.msg);
            }

            queryClient.invalidateQueries({ queryKey: ["task", taskID] });
        },
    });

    const handleDelete = () => {
        const data = {
            projectID,
            taskID,
            noteID: note._id,
        };

        mutate(data);
    };

    if (isLoading) {
        return <p className="text-5xl font-bold text-center">Cargando...</p>;
    }

    return (
        <div className="p-3 flex justify-between items-center">
            <div>
                <p>
                    {note.content} -{" "}
                    <span className="font-bold">{note.createdBy.userName}</span>
                </p>
                <p className="text-xs text-slate-500">
                    {formatDate(note.createdAt)}
                </p>
            </div>

            {canDelete && (
                <button
                    type="button"
                    className="bg-red-400 hover:bg-red-500 p-2 text-s text-white font-bold cursor-pointer transition rounded-lg"
                    onClick={handleDelete}
                >
                    Eliminar
                </button>
            )}
        </div>
    );
}
