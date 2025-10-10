import { z } from "zod";

// Auth Users
export const authSchema = z.object({
    userName: z.string(),
    email: z.email(),
    password: z.string(),
    passwordConfirmation: z.string(),
});

type Auth = z.infer<typeof authSchema>;
export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
    Auth,
    "userName" | "email" | "password" | "passwordConfirmation"
>;

export type AuthResponse = {
    msg?: string;
};

// Tasks
export const taskStatusSchema = z.enum([
    "pending",
    "onHold",
    "inProgress",
    "underReview",
    "completed",
]);

export type TaskStatus = z.infer<typeof taskStatusSchema>;

export const taskSchema = z.object({
    _id: z.string(),
    taskName: z.string(),
    description: z.string(),
    project: z.string(),
    status: taskStatusSchema,
    createdAt: z.string(),
    updatedAt: z.string(),
});

export const dashboardTaskSchema = z.array(
    taskSchema.pick({
        _id: true,
        taskName: true,
        description: true,
        project: true,
        status: true,
    })
);

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "taskName" | "description">;

export type DashboardTask = z.infer<typeof dashboardTaskSchema>;

export type TaskResponse = {
    msg?: string;
    task?: Task;
    tasks?: DashboardTask;
};

// Projects
export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        clientName: true,
        projectName: true,
        description: true,
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
    Project,
    "projectName" | "clientName" | "description"
>;

export type DashboardProject = z.infer<typeof dashboardProjectSchema>;

export type ProjectResponse = {
    msg?: string;
    project?: Project;
    projects?: DashboardProject;
};
