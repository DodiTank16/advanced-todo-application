import { app } from './app.js';
import { Server } from './config/config.js';
import http from 'http';
import connectDB from './db/connect.js';

const httpServer = http.createServer(app);

httpServer.listen(Server.SERVER_PORT, () => {
    connectDB();
    console.log(`⚙️ Server is running on port ${Server.SERVER_PORT} 🚀`);
    // console.log(`⚙️ App is running on Url: ${connectionURL}`);
});

export const SHUTDOWN = (callback: any) => httpServer && httpServer.close(callback);
