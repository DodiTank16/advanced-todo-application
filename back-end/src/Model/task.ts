import mongoose, { Document, model, Schema } from 'mongoose';

export type TTask = {
    name: string;
    isDone: string;
};

export interface ITask extends TTask, Document {}

const taskSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    isDone: {
        type: Boolean,
        required: true
    }
});

const Task = model<ITask>('Task', taskSchema);

export default Task;
