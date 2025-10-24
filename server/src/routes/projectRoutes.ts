import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middlewares/validation";
import { validateProjectExists } from "../middlewares/proyect";
import {
    hasAuthorization,
    taskBeLongsToProject,
    validateTaskExists,
} from "../middlewares/task";
import { authenticate } from "../middlewares/auth";
import { TeamMemberController } from "../controllers/TeamController";

const router = Router();

router.use(authenticate);

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

router.param("projectID", validateProjectExists);

// Create a new Task under a specific Project
router.post(
    "/:projectID/tasks",
    hasAuthorization,
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

router.param("taskID", validateTaskExists);
router.param("taskID", taskBeLongsToProject);

router.get(
    "/:projectID/tasks/:taskID",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    param("taskID").isMongoId().withMessage("Invalid Task ID"),
    handleInputErrors,
    TaskController.getTaskByID
);

router.put(
    "/:projectID/tasks/:taskID",
    hasAuthorization,
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    param("taskID").isMongoId().withMessage("Invalid Task ID"),
    body("taskName").notEmpty().withMessage("Task name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    TaskController.updateTask
);

router.delete(
    "/:projectID/tasks/:taskID",
    hasAuthorization,
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    param("taskID").isMongoId().withMessage("Invalid Task ID"),
    handleInputErrors,
    TaskController.deleteTask
);

router.post(
    "/:projectID/tasks/:taskID/status",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    param("taskID").isMongoId().withMessage("Invalid Task ID"),
    body("status").notEmpty().withMessage("Status is required"),
    handleInputErrors,
    TaskController.updateStatusTask
);

// Routes for Teams

router.post(
    "/:projectID/team/find",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    body("email").isEmail().toLowerCase().withMessage("Invalid email"),
    handleInputErrors,
    TeamMemberController.findMemberByEmail
);

router.get(
    "/:projectID/team",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    TeamMemberController.getProjectTeam
);

router.post(
    "/:projectID/team",
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    body("id").isMongoId().withMessage("Invalid User ID"),
    handleInputErrors,
    TeamMemberController.addMemberByID
);

router.delete(
    "/:projectID/team/:userID",
    param("userID").isMongoId().withMessage("Invalid User ID"),
    param("projectID").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    TeamMemberController.removeMemberByID
);

export default router;
