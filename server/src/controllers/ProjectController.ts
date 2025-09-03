import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).send({ msg: "Project created successfully" });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem creating the project",
            });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json({ projects });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem getting the projects",
            });
        }
    };

    static getProjectByID = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).send({ msg: error.message });
            }

            res.json({ project });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem getting the project",
            });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findByIdAndUpdate(id, req.body);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).send({ msg: error.message });
            }

            res.send({ msg: "Project updated successfully" });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem updating the project",
            });
        }
    };

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findByIdAndDelete(id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).send({ msg: error.message });
            }

            res.send({ msg: "Project deleted successfully" });
        } catch (error) {
            res.status(500).send({
                msg: "There was a problem deleting the project",
            });
        }
    };
}
