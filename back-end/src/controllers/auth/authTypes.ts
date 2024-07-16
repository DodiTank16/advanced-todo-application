import { Request } from 'express';

export interface LoginRequest {
    email: string;
    password: string;
}

export interface JwtTokenRequest {
    email: string;
    expirationDate: Date;
}

export interface customType extends Request {
    userId: string;
}
