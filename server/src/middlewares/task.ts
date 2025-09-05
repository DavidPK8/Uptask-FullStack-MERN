import type { Request, Response, NextFunction } from "express";
import Task, { ITask } from "../models/Task";

// Extend Express Request interface to include project property
declare global {
    namespace Express {
        interface Request {
            task: ITask;
        }
    }
}

export async function validateTaskExists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { taskID } = req.params;
        const task = await Task.findById(taskID);

        if (!task) {
            const error = new Error("Task not found");
            return res.status(404).send({ error: error.message });
        }

        req.task = task;
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}

export function taskBeLongsToProject(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        if (req.task.project.toString() !== req.project.id.toString()) {
            const error = new Error("Task does not belong to this project");
            return res.status(400).json({ error: error.message });
        }

        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}
