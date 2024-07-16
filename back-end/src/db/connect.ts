import mongoose from 'mongoose';
import { Server } from '../config/config.js';

const connectDB = async () => {
    try {
        console.log('MONGO_URI', Server.MONGO_URI as string);
        const database = await mongoose.connect(Server.MONGO_URI as string);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        process.exit(1);
    }
};

export default connectDB;
