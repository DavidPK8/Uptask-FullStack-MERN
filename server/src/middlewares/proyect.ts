import type { Request, Response, NextFunction } from "express";
import Project, { IProject } from "../models/Project";

// Extend Express Request interface to include project property
declare global {
    namespace Express {
        interface Request {
            project: IProject;
        }
    }
}

export async function validateProjectExists(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { projectID } = req.params;
        const project = await Project.findById(projectID);

        if (!project) {
            const error = new Error("Project not found");
            return res.status(404).send({ error: error.message });
        }

        req.project = project;
        next();
    } catch (error) {
        res.status(500).json({
            error: error.message,
        });
    }
}