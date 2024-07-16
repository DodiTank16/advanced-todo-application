import express from 'express';
import AuthRouter from './Auth.js';

const router = express.Router();

//Auth Routes
router.use('/auth', AuthRouter);

// router.use('/login', authController);
// router.use('/register',UserRouter);
// router.use('/forgot-password',UserRouter);

//User Routes
// router.use('/login',UserRouter);
// router.use('/register',UserRouter);
// router.use('/forgot-password',UserRouter);

//Task Routes
// router.use('/login', UserRouter);
// router.use('/register',UserRouter);
// router.use('/forgot-password',UserRouter);

export default router;
