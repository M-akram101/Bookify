// utils/router.ts
import { Router, Request, Response, NextFunction } from 'express';
import { asyncHandler } from '../middleware/asyncHandler';

export const createAsyncRouter = () => {
    const router: any = Router();

    // Override the `get`, `post`, etc. methods to automatically wrap only the last handler with asyncHandler
    ['get', 'post', 'put', 'delete', 'patch'].forEach((method) => {
        const originalMethod = router[method];

        router[method] = (path: string, ...handlers: any[]) => {
            if (handlers.length === 0) {
                throw new Error(`No handlers provided for route ${method.toUpperCase()} ${path}`);
            }

            // Separate middlewares and the final handler
            const middlewares = handlers.slice(0, -1);
            const finalHandler = handlers[handlers.length - 1];

            // Wrap only the final handler
            const wrappedFinalHandler = asyncHandler(finalHandler);

            // Apply the route with middlewares and the wrapped final handler
            originalMethod.call(router, path, ...middlewares, wrappedFinalHandler);
        };
    });

    return router;
};
