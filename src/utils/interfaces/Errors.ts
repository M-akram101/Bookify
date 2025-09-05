import { ApiResponseStatus } from '../enums/enums';

export interface ApiError {
    statusCode?: number;
    message: string;
    details?: string;
    stack?: string;
    status?: ApiResponseStatus;
    code?: number;
}

export interface ValidationError extends ApiError {
    validationErrors: string[];
}
