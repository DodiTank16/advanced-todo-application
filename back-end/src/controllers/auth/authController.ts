import bcrypt from 'bcryptjs';
import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../../Model/user.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';
import { generateToken } from '../../utils/TokenGenraction.js';
import { hashPassword } from '../../utils/hash.js';

const { compareSync } = bcrypt;
export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        let user = await User.findOne({ email }).select('-_id   -createdAt -updatedAt');

        if (!user) {
            throw new ApiError(502, 'User does not exists!');
        }
        if (!compareSync(password, user.password)) {
            throw new ApiError(502, 'Incorrect password!');
        }

        const token = generateToken(user.id, '1d');

        res.cookie('token', token);
        res.status(200).json(new ApiResponse(200, { user, token }, 'Login Successfully'));
        return;
    } catch (error: any) {
        console.log(error);
        res.status(error.status || 500).json(new ApiResponse(error.status || 500, error.errors || null, error.message || 'Login Error'));
        // next(error);
    }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, username, email, password, confirmPassword } = req.body;

        if (password !== confirmPassword) {
            throw new ApiError(400, 'Passwords do not match');
        }

        const existingUsername = await User.findOne({ username }).select('-_id -createdAt -updatedAt');
        if (existingUsername) {
            throw new ApiError(502, 'Username already in use');
        }

        const existingEmail = await User.findOne({ email }).select('-_id -createdAt -updatedAt');
        if (existingEmail) {
            throw new ApiError(502, 'Email already in use');
        }

        const newUser: IUser = new User({
            name,
            username,
            email,
            password: await hashPassword(12, password),
            createdAt: new Date(),
            updatedAt: new Date()
        });

        await newUser.save();

        return res.status(200).json(new ApiResponse(200, null, 'User registered successfully'));
    } catch (error: any) {
        console.log(error);
        res.status(error.status || 500).json(new ApiResponse(error.status || 500, error.errors || null, error.message || 'Server error'));
        // next(error);
    }
};
