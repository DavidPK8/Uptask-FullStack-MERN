import { z } from "zod";

// Auth Users

export const authSchema = z.object({
    userName: z.string(),
    email: z.email(),
    password: z.string(),
    passwordConfirmation: z.string(),
    token: z.string(),
});

type Auth = z.infer<typeof authSchema>;

export type UserLoginForm = Pick<Auth, "email" | "password">;
export type UserRegistrationForm = Pick<
    Auth,
    "userName" | "email" | "password" | "passwordConfirmation"
>;
export type RequestConfirmationCodeForm = Pick<Auth, "email">;
export type ForgotPasswordForm = Pick<Auth, "email">;
export type NewPasswordForm = Pick<Auth, "password" | "passwordConfirmation">;
export type ConfirmToken = Pick<Auth, "token">;

// Users

export const userSchema = authSchema
    .pick({
        userName: true,
        email: true,
    })
    .extend({
        _id: z.string(),
    });

export type User = z.infer<typeof userSchema>;

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
    completedBy: z.array(
        z.object({
            _id: z.string(),
            user: userSchema,
            status: taskStatusSchema,
        })
    ),
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

// Projects

export const projectSchema = z.object({
    _id: z.string(),
    projectName: z.string(),
    clientName: z.string(),
    description: z.string(),
    tasks: z.array(taskSchema),
    manager: z.string(),
});

export const dashboardProjectSchema = z.array(
    projectSchema.pick({
        _id: true,
        clientName: true,
        projectName: true,
        description: true,
        manager: true,
    })
);

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<
    Project,
    "projectName" | "clientName" | "description"
>;

export type DashboardProject = z.infer<typeof dashboardProjectSchema>;

// Project Team

export const teamMemberSchema = userSchema.pick({
    userName: true,
    email: true,
    _id: true,
});

export const teamMembersSchema = z.array(teamMemberSchema);
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, "email">;

// Responses

export type AuthResponse = {
    msg?: string;
    token?: string;
};

export type TaskResponse = {
    msg?: string;
    task?: Task;
    tasks?: DashboardTask;
};

export type ProjectResponse = {
    msg?: string;
    project?: Project;
    projects?: DashboardProject;
};

export type ProjectTeamResponse = {
    msg?: string;
    project?: TeamMember[];
    user?: User;
};
