import { useParams } from "react-router-dom";

export default function EditProjectView() {
    const params = useParams();
    const projectID = params.projectID!;

    return <div>EditProjectView</div>;
}
