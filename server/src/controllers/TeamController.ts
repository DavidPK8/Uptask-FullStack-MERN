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
        const { id } = req.body;

        const user = await User.findById(id);

        if (!user) {
            const error = new Error("User not found");
            return res.status(404).json({ error: error.message });
        }

        if (req.project.team.includes(user.id)) {
            const error = new Error("User is already a member of the project");
            return res.status(400).json({ error: error.message });
        }

        req.project.team.push(user.id);
        await req.project.save();

        res.json({ msg: "Member added to the project successfully" });
    };

    static removeMemberByID = async (req: Request, res: Response) => {
        const { id } = req.body;

        if (!req.project.team.includes(id)) {
            const error = new Error("User is not a member of the project");
            return res.status(400).json({ error: error.message });
        }

        req.project.team = req.project.team.filter(
            (memberID) => memberID.toString() !== id
        );

        await req.project.save();

        res.json({ msg: "Member removed of the project successfully" });
    };
}
