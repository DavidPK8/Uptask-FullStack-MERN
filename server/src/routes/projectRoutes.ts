import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middlewares/validation";
import { validteProjectExists } from "../middlewares/proyect";

const router = Router();

/* Routes for Projects */
// Create a new Project
router.post(
    "/",
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.createProject
);

// Get all Projects
router.get("/", ProjectController.getAllProjects);

// Get a Project by ID
router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    ProjectController.getProjectByID
);

// Update a Project by ID
router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProject
);

// Delete a Project by ID
router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    ProjectController.deleteProject
);

/* Routes for Tasks */
// Create a new Task under a specific Project
router.post(
    "/:projectID/tasks",
    validteProjectExists,
    TaskController.createTask
);

export default router;
