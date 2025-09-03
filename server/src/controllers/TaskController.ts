import type { Request, Response } from "express";
import Project from "../models/Project";
import Task from "../models/Task";
import { Types } from "mongoose";

export class TaskController {
    static createTask = async (req: Request, res: Response) => {
        const { projectID } = req.params;
        const project = await Project.findById(projectID);

        if (!project) {
            const error = new Error("Project not found");
            return res.status(404).send({ msg: error.message });
        }

        try {
            const task = new Task(req.body);
            task.projectID = project._id as Types.ObjectId;
            project.tasks.push(task._id as Types.ObjectId);
            await task.save();
            await project.save();
            res.status(201).send({ msg: "Task created successfully" });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem creating the task",
            });
        }
    };
}
