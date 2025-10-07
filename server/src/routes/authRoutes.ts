import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.post(
    "/create-account",
    body("userName").notEmpty().withMessage("UserName is Required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }

        return true;
    }),
    body("email").isEmail().withMessage("Invalid Email"),
    handleInputErrors,
    AuthController.createAccount
);

router.post(
    "/confirm-account",
    body("token").notEmpty().withMessage("Token is Required"),
    handleInputErrors,
    AuthController.confirmAccount
);

export default router;
