import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";

const router = Router();

router.post(
    "/",
    body("userName").notEmpty().withMessage("UserName is Required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password is short, minimum of 8 characters"),
    body("passwordConfirmation").custom((value, {req}) => {
        if (value !== req.body.password) {
            throw new Error("Passwords are not the same")
        }

        return true;
    }),
    body("email").isEmail().withMessage("Invalid Email"),
    handleInputErrors,
    AuthController.createAccount
);

export default router;
