class ApiError extends Error {
    status: number;
    data: any;
    success: boolean;
    errors: Error[];

    constructor(status: number, message: string = 'Something went wrong', errors: Error[] = [], stack: string = '') {
        super(message);
        this.status = status;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export default ApiError;
