import { Navigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getProjectByID } from "@/api/ProjectAPI";
import EditProjectFrom from "@/components/project/EditProjectForm";

export default function EditProjectView() {
    const params = useParams();
    const projectID = params.projectID!;

    const { data, isLoading, isError } = useQuery({
        queryKey: ["editProject", projectID],
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
        return <EditProjectFrom data={data} projectID={projectID} />;
    }
}
