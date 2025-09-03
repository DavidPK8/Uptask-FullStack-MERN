import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../controllers/ProjectController";
import { TaskController } from "../controllers/TaskController";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.post(
    "/",
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.createProject
);

router.get("/", ProjectController.getAllProjects);
router.get(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    ProjectController.getProjectByID
);

router.put(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    body("projectName").notEmpty().withMessage("Project name is required"),
    body("clientName").notEmpty().withMessage("Client name is required"),
    body("description").notEmpty().withMessage("Description is required"),
    handleInputErrors,
    ProjectController.updateProject
);

router.delete(
    "/:id",
    param("id").isMongoId().withMessage("Invalid Project ID"),
    handleInputErrors,
    ProjectController.deleteProject
);

/* Routes for Tasks */
router.post("/:projectID/tasks", TaskController.createTask);

export default router;
