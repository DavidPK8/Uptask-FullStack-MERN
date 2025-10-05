import type { Request, Response } from "express";
import Task from "../models/Task";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.project = req.project.id;
            req.project.tasks.push(task.id);

            await Promise.allSettled([task.save(), req.project.save()]);

            res.status(201).json({ msg: "Task created successfully" });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };

    static getProyectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({
                project: req.project.id,
            }).populate("project");

            res.json({ tasks: tasks });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static getTaskByID = async (req: Request, res: Response) => {
        try {
            res.json({ task: req.task });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        try {
            req.task.taskName = req.body.taskName;
            req.task.description = req.body.description;

            await req.task.save();

            res.json({ msg: "Task updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static deleteTask = async (req: Request, res: Response) => {
        try {
            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== req.task.id.toString()
            );

            await Promise.allSettled([
                req.task.deleteOne(),
                req.project.save(),
            ]);

            res.json({ msg: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static updateStatusTask = async (req: Request, res: Response) => {
        try {
            const { status } = req.body;
            req.task.status = status;

            await req.task.save();

            res.json({ msg: "Status Task updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };
}
