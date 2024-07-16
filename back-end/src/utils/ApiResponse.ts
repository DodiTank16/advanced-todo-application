import { Response } from 'express';

class ApiResponse {
    status: number;
    data?: any;
    message?: string;
    success: boolean;
    constructor(status: number, data: any, message: string = 'Success') {
        this.status = status;
        this.data = data;
        this.message = message;
        this.success = status < 400;
    }
}

export default ApiResponse;
