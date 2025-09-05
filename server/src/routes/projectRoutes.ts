import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middlewares/validation";
import { validateProjectExists } from "../middlewares/proyect";

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
router.param("/projectID", validateProjectExists);

// Create a new Task under a specific Project
router.post(
    "/:projectID/tasks",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    body("taskName").notEmpty().withMessage("Task name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    TaskController.createTask
);

router.get(
    "/:projectID/tasks",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    TaskController.getProyectTasks
);

router.get(
    "/:projectID/tasks/:taskID",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    param("taskID").isMongoId().withMessage("Invalid Task ID"),
    handleInputErrors,
    TaskController.getTaskByID
);

export default router;
