import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { body, param } from "express-validator";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";

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

router.post(
    "/login",
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").notEmpty().withMessage("Password is Required"),
    handleInputErrors,
    AuthController.login
);

router.post(
    "/request-code",
    body("email").isEmail().withMessage("Invalid Email"),
    handleInputErrors,
    AuthController.requestConfirmationCode
);

router.post(
    "/forgot-password",
    body("email").isEmail().withMessage("Invalid Email"),
    handleInputErrors,
    AuthController.forgotPassword
);

router.post(
    "/validate-token",
    body("token").notEmpty().withMessage("Token is Required"),
    handleInputErrors,
    AuthController.validateToken
);

router.post(
    "/update-password/:token",
    param("token").isNumeric().withMessage("Invalid Token"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }

        return true;
    }),
    handleInputErrors,
    AuthController.updatePasswordWithToken
);

router.get("/user", authenticate, AuthController.user);

// Profile

router.put(
    "/profile",
    authenticate,
    body("userName").notEmpty().withMessage("UserName is Required"),
    body("email").isEmail().withMessage("Invalid Email"),
    handleInputErrors,
    AuthController.updateProfile
);

router.post(
    "/update-password",
    authenticate,
    body("currentPassword")
        .notEmpty()
        .withMessage("Current Password is Required"),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters"),
    body("passwordConfirmation").custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error("Passwords do not match");
        }

        return true;
    }),
    handleInputErrors,
    AuthController.updateUserPassword
);

router.post(
    "/check-password",
    authenticate,
    body("password").notEmpty().withMessage("Password is Required"),
    handleInputErrors,
    AuthController.checkPassword
);

export default router;
