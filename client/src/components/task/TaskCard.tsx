import type { Task } from "@/types/index";

type TaskCardProp = {
    task: Task;
};

export default function TaskCard({ task }: TaskCardProp) {
    return <div>TaskCard</div>;
}
