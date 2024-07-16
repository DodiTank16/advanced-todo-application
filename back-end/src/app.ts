import express, { NextFunction, Request, Response } from 'express';
import { loggingFunction } from './middleware/loggingHandler.js';
import cors from 'cors';
import { routeNotFound } from './middleware/routeNotFound.js';
import favicon from 'serve-favicon';
import path from 'path';
import router from './routes/index.js';

export const app = express();
console.clear();

const faviconPath = path.resolve(import.meta.dirname, '..', 'public', 'images', 'favicon.ico');

app.use(favicon(faviconPath));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '24kb' }));
app.use(express.static('public'));
app.use(loggingFunction);
app.use(cors());

app.use('/api/v1', router);

app.get('/healthCheck', (req, res, next) => {
    return res.status(200).json({ message: 'Server is Healthy 💪💚🥗🧘‍♀️🥗🍎🌱🔆' });
});

app.use(routeNotFound);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    // Log the error (optional)
    console.error(err.stack);

    // Send the error response
    res.status(err.status || 500).json({ error: err.message, status: err.status, success: err.success });
});
