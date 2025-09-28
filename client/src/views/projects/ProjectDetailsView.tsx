import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectByID } from "@/api/ProjectAPI";
import AddTaskModal from "@/components/tasks/AddTaskModal";
import TaskList from "@/components/tasks/TaskList";
import EditTaskData from "@/components/tasks/EditTaskData";

export default function ProjectDetailsView() {
    const navigate = useNavigate();
    const location = useLocation();

    const params = useParams();
    const projectID = params.projectID!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["project", projectID],
        queryFn: () => getProjectByID(projectID),
        retry: false,
    });

    if (isLoading) {
        return <p className="text-5xl font-bold text-center">Cargando...</p>;
    }

    if (isError) {
        return <Navigate to="/404"></Navigate>;
    }

    if (data) {
        return (
            <>
                <h1 className="text-5xl font-black">{data.projectName}</h1>
                <p className="text-2xl font-light text-gray-500 mt-5">
                    {data.description}
                </p>

                <nav className="my-5 flex gap-3">
                    <button
                        type="button"
                        className="bg-purple-400 hover:bg-purple-500 px-10 py-3 text-white text-xl font-bold cursor-pointer transition-colors"
                        onClick={() =>
                            navigate(location.pathname + "?newtask=true")
                        }
                    >
                        Agregar Tarea
                    </button>
                </nav>

                <TaskList tasks={data.tasks} />
                <AddTaskModal />
                <EditTaskData />
            </>
        );
    }
}
