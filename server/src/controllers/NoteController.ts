import type { Request, Response } from "express";
import Note, { INote } from "../models/Note";
import { Types } from "mongoose";

type NoteParams = {
    noteID: Types.ObjectId;
};

export class NoteController {
    static createNote = async (req: Request<{}, {}, INote>, res: Response) => {
        try {
            const { content } = req.body;
            const note = new Note();

            note.content = content;
            note.createdBy = req.user.id;
            note.task = req.task.id;

            req.task.notes.push(note.id);

            await Promise.allSettled([note.save(), req.task.save()]);
            res.status(201).json({ msg: "Note created successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static getTaskNotes = async (req: Request, res: Response) => {
        try {
            const notes = await Note.find({ task: req.task.id });
            res.json({ notes });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };

    static deleteNote = async (req: Request<NoteParams>, res: Response) => {
        try {
            const { noteID } = req.params;
            const note = await Note.findById(noteID);

            if (!note) {
                const error = new Error("Note not found");
                return res.status(404).json({ error: error.message });
            }

            if (note.createdBy.toString() !== req.user.id.toString()) {
                const error = new Error("Invalid Action");
                return res.status(403).json({ error: error.message });
            }

            req.task.notes = req.task.notes.filter(
                (note) => note.toString() !== noteID.toString()
            );

            await Promise.allSettled([note.deleteOne(), req.task.save()]);

            res.json({ msg: "Note deleted successfully" });
        } catch (error) {
            res.status(500).json({ error: "There was an error" });
        }
    };
}
