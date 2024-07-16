import express from 'express';
import { login, register } from '../controllers/auth/authController.js';

const router = express.Router();

router.get('/authhealth', (req, res) => {
    res.json({ Message: 'Auth Health: FINE ' });
});

router.post('/login', login);
router.post('/register', register);

// router.use('/register',UserRouter);
// router.use('/forgot-password',UserRouter);

export default router;
