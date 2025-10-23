import { addUserToProject } from "@/api/TeamAPI";
import type { TeamMember } from "@/types/index";
import { useMutation } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

type SearchResultProps = {
    user: TeamMember;
    reset: () => void;
};

export default function SearchResult({ user, reset }: SearchResultProps) {
    const params = useParams();
    const projectID = params.projectID!;

    const navigate = useNavigate();

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data?.msg) {
                toast.success(data.msg);
            }

            reset();
            navigate(location.pathname, { replace: true });
        },
    });

    const handleAddUser = () => {
        const data = {
            id: user._id,
            projectID,
        };

        mutate(data);
    };

    return (
        <>
            <p className="mt-10 text-center font-bold">Resultado: </p>
            <div className="flex justify-between items-center">
                <p>{user.userName}</p>
                <button
                    className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer transition-colors"
                    onClick={handleAddUser}
                >
                    Agregar al Proyecto
                </button>
            </div>
        </>
    );
}
