import { Request, Response, NextFunction } from 'express';
import Joi, { Schema } from 'joi';
import { ValidationError } from '../utils/interfaces/Errors'; // Ensure you have the ValidationError interface

export const validateRequest = (schema: Schema) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            // Validate the request body using the schema asynchronously
            const value = await schema.validateAsync(req.body, { abortEarly: false, stripUnknown: true });

            req.body = value;

            // No validation error
            next();
        } catch (err: any) {
            if (err?.details) {
                const validationError: ValidationError = {
                    statusCode: 400,
                    message: 'Validation error',
                    validationErrors: err.details.map((detail: any) => detail.message),
                    stack: err.stack || ''
                };

                // Pass validation errors to the error-handling middleware
                return next(validationError);
            }
            // Handle unexpected errors
            return next(err);
        }
    };
};
