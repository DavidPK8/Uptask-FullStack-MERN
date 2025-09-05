import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        try {
            await project.save();
            res.status(201).json({ msg: "Project created successfully" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({});
            res.json({ projects });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static getProjectByID = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id).populate("tasks");

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            res.json({ project });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findByIdAndUpdate(id, req.body);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            res.json({ msg: "Project updated successfully" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findByIdAndDelete(id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            res.json({ msg: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({
                error: error.message,
            });
        }
    };
}
