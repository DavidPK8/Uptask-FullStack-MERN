import type { Request, Response } from "express";
import User from "../models/User";

export class TeamMemberController {
    static findMemberByEmail = async (req: Request, res: Response) => {
        const { email } = req.body;

        const user = await User.findOne({ email }).select("id userName email");

        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({ error: error.message });
        }

        res.json({ user });
    };

    static addMemberByID = async (req: Request, res: Response) => {
        const { email } = req.body;

        const user = await User.findOne({ email }).select("id userName email");

        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({ error: error.message });
        }

        res.json({ user });
    };
}
