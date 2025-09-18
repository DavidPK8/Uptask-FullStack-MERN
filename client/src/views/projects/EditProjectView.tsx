import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectByID } from "@/api/ProjectAPI";

export default function EditProjectView() {
    const params = useParams();
    const projectID = params.projectID!;

    const { data, isLoading, error, isError } = useQuery({
        queryKey: ["editProject", projectID],
        queryFn: () => getProjectByID(projectID),
        retry: false,
    });

    return <div>EditProjectView</div>;
}
