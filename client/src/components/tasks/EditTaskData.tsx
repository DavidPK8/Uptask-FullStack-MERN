import { useLocation, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTaskByID } from "@/api/TaskAPI";

export default function EditTaskData() {
    // Recuperando el ID del proyecto
    const params = useParams();
    const projectID = params.projectID!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("editTask")!;

    const { data } = useQuery({
        queryKey: ["task", taskID],
        queryFn: () =>
            getTaskByID({
                projectID,
                taskID,
            }),
    });

    return <div>EditTaskData</div>;
}
