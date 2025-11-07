import type { Request, Response } from "express";
import Project from "../models/Project";

export class ProjectController {
    static createProject = async (req: Request, res: Response) => {
        const project = new Project(req.body);

        // Assign the manager
        project.manager = req.user.id;

        try {
            await project.save();
            res.status(201).json({ msg: "Project created successfully" });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };

    static getAllProjects = async (req: Request, res: Response) => {
        try {
            const projects = await Project.find({
                $or: [
                    { manager: { $in: req.user.id } },
                    { team: { $in: req.user.id } },
                ],
            });
            res.json({ projects });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };

    static getProjectByID = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id)
                .populate("tasks")
                .populate("team");

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            if (
                project.manager.toString() !== req.user.id.toString() &&
                !project.team.includes(req.user.id)
            ) {
                const error = new Error("Invalid Action");
                return res.status(404).json({ error: error.message });
            }

            res.json({ project });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };

    static updateProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error(
                    "Only the manager can update a project"
                );
                return res.status(404).json({ error: error.message });
            }

            project.projectName = req.body.projectName;
            project.clientName = req.body.clientName;
            project.description = req.body.description;

            await project.save();

            res.json({ msg: "Project updated successfully" });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };

    static deleteProject = async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            const project = await Project.findById(id);

            if (!project) {
                const error = new Error("Project not found");
                return res.status(404).json({ error: error.message });
            }

            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error(
                    "Only the manager can delete a project"
                );
                return res.status(404).json({ error: error.message });
            }

            await Promise.allSettled([project.deleteOne(), project.save()]);

            res.json({ msg: "Project deleted successfully" });
        } catch (error) {
            res.status(500).json({
                error: "There was an error",
            });
        }
    };
}
