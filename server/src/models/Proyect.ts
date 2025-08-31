import mongoose, { Schema, Document } from "mongoose";

// Definición de la interfaz para el modelo de Proyecto
export type ProjectType = Document & {
    projectName: string;
    clientName: string;
    description: string;
};

// Definición del esquema para el modelo de Proyecto
const ProjectSchema: Schema = new Schema({
    projectName: {
        type: String,
        required: true,
        trim: true,
    },
    clientName: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
});

const Project = mongoose.model<ProjectType>("Project", ProjectSchema);
export default Project;