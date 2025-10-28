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
import NotesPanel from "../notes/NotesPanel";

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

                                        {data.completedBy.length ? (
                                            <>
                                                <div className="space-y-4">
                                                    <p className="text-lg text-slate-500 font-semibold mb-4">
                                                        Historial de cambios
                                                    </p>

                                                    <ul className="relative border-l-2 border-slate-300">
                                                        {data.completedBy.map(
                                                            (
                                                                activityLog,
                                                                index
                                                            ) => (
                                                                <li
                                                                    key={
                                                                        activityLog._id
                                                                    }
                                                                    className="mb-6 ml-6"
                                                                >
                                                                    <div className="absolute -left-3 w-6 h-6 bg-slate-500 rounded-full border-4 border-white flex items-center justify-center">
                                                                        <span className="text-xs text-white">
                                                                            {index +
                                                                                1}
                                                                        </span>
                                                                    </div>
                                                                    <div className="text-sm">
                                                                        <span className="font-bold text-slate-600">
                                                                            {
                                                                                statusTranslations[
                                                                                    activityLog
                                                                                        .status
                                                                                ]
                                                                            }
                                                                        </span>{" "}
                                                                        <span className="text-slate-500">
                                                                            por:
                                                                        </span>{" "}
                                                                        <span className="text-slate-700">
                                                                            {
                                                                                activityLog
                                                                                    .user
                                                                                    .userName
                                                                            }
                                                                        </span>
                                                                    </div>
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </>
                                        ) : null}

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

                                        <NotesPanel />
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
