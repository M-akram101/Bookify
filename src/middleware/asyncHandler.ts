// utils/asyncHandler.ts
import { Request, Response, NextFunction } from 'express';

export const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next); // Automatically calls `next(err)` if `fn` throws an error
    };
};
