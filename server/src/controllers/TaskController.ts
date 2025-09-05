import type { Request, Response } from "express";
import Task from "../models/Task";
import { Types } from "mongoose";

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
                error: error.message,
            });
        }
    };

    static getProyectTasks = async (req: Request, res: Response) => {
        try {
            const tasks = await Task.find({
                project: req.project.id,
            }).populate("project");

            res.json(tasks);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static getTaskByID = async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const task = await Task.findById(taskID);

            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ error: error.message });
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error("Task does not belong to this project");
                return res.status(400).json({ error: error.message });
            }

            res.json(task);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static updateTask = async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const task = await Task.findByIdAndUpdate(taskID, req.body);

            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ error: error.message });
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error("Task does not belong to this project");
                return res.status(400).json({ error: error.message });
            }

            res.json({ msg: "Task updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static deleteTask = async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const task = await Task.findByIdAndDelete(taskID);

            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ error: error.message });
            }

            if (task.project.toString() !== req.project.id) {
                const error = new Error("Task does not belong to this project");
                return res.status(400).json({ error: error.message });
            }

            req.project.tasks = req.project.tasks.filter(
                (task) => task.toString() !== taskID
            );

            await req.project.save();

            res.json({ msg: "Task deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };

    static updateStatusTask = async (req: Request, res: Response) => {
        try {
            const { taskID } = req.params;
            const task = await Task.findById(taskID);

            if (!task) {
                const error = new Error("Task not found");
                return res.status(404).json({ error: error.message });
            }

            const { status } = req.body;
            task.status = status;

            await task.save();

            res.json({ msg: "Status Task updated successfully" });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    };
}
