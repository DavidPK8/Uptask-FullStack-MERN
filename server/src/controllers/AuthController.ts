import { Request, Response } from "express";
import User from "../models/User";
import { checkPassword, hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { AuthEmail } from "../emails/AuthEmail";
import { generateJWT } from "../utils/jwt";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            const userExists = await User.findOne({ email });

            if (userExists) {
                const error = new Error("Account already exists");
                return res.status(409).json({ error: error.message });
            }

            const user = new User(req.body);

            // Hash Password
            user.password = await hashPassword(password);

            // Generate token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Send the email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                userName: user.userName,
                token: token.token,
            });

            await Promise.allSettled([user.save(), token.save()]);

            res.status(201).json({
                msg: "Account created, check your email to confirm",
            });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static confirmAccount = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                return res.status(401).json({ error: error.message });
            }

            const user = await User.findById(tokenExists.user);
            user.confirmed = true;

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.json({ msg: "Account confirmed successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static login = async (req: Request, res: Response) => {
        try {
            const { email, password } = req.body;

            const user = await User.findOne({ email });

            // Confirmate user exists
            if (!user) {
                const error = new Error("User does not exist");
                return res.status(404).json({ error: error.message });
            }

            // Confirmate user is confirmed
            if (!user.confirmed) {
                const token = new Token();
                token.user = user.id;
                token.token = generateToken();
                await token.save();

                // Send the email
                AuthEmail.sendConfirmationEmail({
                    email: user.email,
                    userName: user.userName,
                    token: token.token,
                });

                const error = new Error(
                    "User not confirmed, we have sent you a new confirmation email"
                );
                return res.status(403).json({ error: error.message });
            }

            // Check Password
            const isPasswordCorrect = await checkPassword(
                password,
                user.password
            );

            if (!isPasswordCorrect) {
                const error = new Error("Password is incorrect");
                return res.status(401).json({ error: error.message });
            }

            const token = generateJWT({ id: user.id });

            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static requestConfirmationCode = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            // Verify if user exists
            const user = await User.findOne({ email });

            if (!user) {
                const error = new Error("User does not exist");
                return res.status(404).json({ error: error.message });
            }

            if (user.confirmed) {
                const error = new Error("Account already confirmed");
                return res.status(409).json({ error: error.message });
            }

            // Generate token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Send the email
            AuthEmail.sendConfirmationEmail({
                email: user.email,
                userName: user.userName,
                token: token.token,
            });

            await Promise.allSettled([user.save(), token.save()]);

            res.status(201).json({
                msg: "We have sent you a new confirmation code, check your email",
            });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static forgotPassword = async (req: Request, res: Response) => {
        try {
            const { email } = req.body;

            // Verify if user exists
            const user = await User.findOne({ email });

            if (!user) {
                const error = new Error("User does not exist");
                return res.status(404).json({ error: error.message });
            }

            // Generate token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;
            await token.save();

            // Send the email
            AuthEmail.sendPasswordReset({
                email: user.email,
                userName: user.userName,
                token: token.token,
            });

            res.status(201).json({
                msg: "Check your email to follow the instructions",
            });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static validateToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.body;

            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                return res.status(401).json({ error: error.message });
            }

            res.json({ msg: "Token valid, Define your new password" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static updatePasswordWithToken = async (req: Request, res: Response) => {
        try {
            const { token } = req.params;
            const { password } = req.body;

            const tokenExists = await Token.findOne({ token });

            if (!tokenExists) {
                const error = new Error("Invalid Token");
                return res.status(401).json({ error: error.message });
            }

            const user = await User.findById(tokenExists.user);
            user.password = await hashPassword(password);

            await Promise.allSettled([user.save(), tokenExists.deleteOne()]);

            res.json({ msg: "Password was changed successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static user = async (req: Request, res: Response) => {
        return res.json(req.user);
    };

    static updateProfile = async (req: Request, res: Response) => {
        try {
            const { userName, email } = req.body;

            const userExists = await User.findOne({ email });

            if (
                userExists &&
                userExists.id.toString() !== req.user.id.toString()
            ) {
                const error = new Error("Email already exists");
                return res.status(409).json({ error: error.message });
            }

            req.user.userName = userName;
            req.user.email = email;

            await req.user.save();
            res.json({ msg: "Profile updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static updateUserPassword = async (req: Request, res: Response) => {
        try {
            const { currentPassword, password } = req.body;

            const user = await User.findById(req.user.id);

            const validatePassword = await checkPassword(
                currentPassword,
                user.password
            );

            if (!validatePassword) {
                const error = new Error("Old Password is incorrect");
                return res.status(401).json({ error: error.message });
            }

            req.user.password = await hashPassword(password);
            await req.user.save();

            res.json({ msg: "Password updated successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };
}
