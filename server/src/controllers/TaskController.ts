import type { Request, Response } from "express";
import Task from "../models/Task";
import { Types } from "mongoose";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        try {
            const task = new Task(req.body);
            task.projectID = req.project._id as Types.ObjectId;
            req.project.tasks.push(task._id as Types.ObjectId);
            await task.save();
            await req.project.save();
            res.status(201).send({ msg: "Task created successfully" });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem creating the task",
            });
        }
    };
}
