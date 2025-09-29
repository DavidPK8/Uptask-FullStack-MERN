import { Fragment, type ChangeEvent } from "react";
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import {
    Navigate,
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTaskByID, updateStatus } from "@/api/TaskAPI";
import { formatDate } from "@/utils/utils";
import { statusTranslations } from "@/locales/es";
import { toast } from "react-toastify";
import type { TaskStatus } from "@/types/index";

export default function TaskModalDetails() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Obtener ProjectID
    const params = useParams();
    const projectID = params.projectID!;

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const taskID = queryParams.get("viewTask")!;

    const showModal = taskID ? true : false;

    const { data, isError } = useQuery({
        queryKey: ["task", taskID],
        queryFn: () => getTaskByID({ projectID, taskID }),
        enabled: !!taskID,
        retry: false,
    });

    const { mutate } = useMutation({
        mutationFn: updateStatus,
        onError: (error) => {
            toast.error(error.message);
        },
        onSuccess: (data) => {
            if (data?.msg) {
                queryClient.invalidateQueries({
                    queryKey: ["project", projectID],
                });
                queryClient.invalidateQueries({
                    queryKey: ["task", taskID],
                });
                navigate(location.pathname, { replace: true });
                toast.success(data.msg);
            }
        },
    });

    const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const status = event.target.value as TaskStatus;

        const data = {
            projectID,
            taskID,
            status,
        };

        mutate(data);
    };

    if (isError) {
        return <Navigate to={`/projects/${projectID}`} />;
    }

    if (data) {
        return (
            <>
                <Transition appear show={showModal} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-10"
                        onClose={() =>
                            navigate(location.pathname, { replace: true })
                        }
                    >
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black/60" />
                        </TransitionChild>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <TransitionChild
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <DialogPanel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-16">
                                        <p className="text-sm text-slate-400">
                                            Agregada el:{" "}
                                            {formatDate(data.createdAt)}
                                        </p>
                                        <p className="text-sm text-slate-400">
                                            Última actualización:{" "}
                                            {formatDate(data.updatedAt)}
                                        </p>
                                        <DialogTitle
                                            as="h3"
                                            className="font-black text-4xl text-slate-600 my-5"
                                        >
                                            {data.taskName}
                                        </DialogTitle>
                                        <p className="text-lg text-slate-500 mb-2">
                                            Descripción: {data.description}
                                        </p>
                                        <div className="my-5 space-y-3">
                                            <label className="font-bold">
                                                Estado Actual:
                                            </label>
                                            <select
                                                className="w-full p-3 mt-3 bg-white border border-gray-300"
                                                defaultValue={data.status}
                                                onChange={handleChange}
                                            >
                                                {Object.entries(
                                                    statusTranslations
                                                ).map(([key, value]) => (
                                                    <option
                                                        key={key}
                                                        value={key}
                                                    >
                                                        {value}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </DialogPanel>
                                </TransitionChild>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </>
        );
    }
}
