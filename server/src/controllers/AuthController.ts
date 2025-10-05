import { Request, Response } from "express";
import User from "../models/User";
import { hashPassword } from "../utils/auth";
import Token from "../models/Token";
import { generateToken } from "../utils/token";
import { transporter } from "../config/nodemailer";

export class AuthController {
    static createAccount = async (req: Request, res: Response) => {
        try {
            const { password, email } = req.body;

            const userExists = await User.findOne({ email });

            if (userExists) {
                return res.status(409).json({ msg: "Accound already exists" });
            }

            const user = new User(req.body);

            // Hash Password
            user.password = await hashPassword(password);

            // Generar el token
            const token = new Token();
            token.token = generateToken();
            token.user = user.id;

            // Enviar el email
            await transporter.sendMail({
                from: "Uptask <admin@uptask.com>",
                to: user.email,
                subject: "Uptask - Confirma tu cuenta",
                text: "Uptask - Confirma tu cuenta",
                html: `<p>Hola ${user.userName}, confirma tu cuenta para seguir</p>`,
            });

            await Promise.allSettled([user.save(), token.save()]);

            res.json({ msg: "Account created, check your email to confirm" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };
}
