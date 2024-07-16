import mongoose, { Document, model, Schema } from 'mongoose';

export type TUser = {
    name: string;
    email: string;
    password: string;
    role: 'user' | 'admin';
    createdAt: string;
    updatedAt: string;
};

export interface IUser extends TUser, Document {}

const userSchema: Schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

const User = model<IUser>('User', userSchema);

export default User;
