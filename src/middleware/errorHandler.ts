import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { ApiError } from "../utils/interfaces/Errors";
import { DEVELOPMENT } from "../config/config";
import { ApiResponseStatus } from "../utils/enums/enums";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error stack only in development or for critical errors
  if (DEVELOPMENT || err.statusCode >= 500) {
    console.error(err.stack ?? err);
  }

  let statusCode = err.statusCode || 500;
  let responseError: ApiError = {
    status: err.status || ApiResponseStatus.Failure,
    message: err.message || "Something went wrong!",
  };

  // Handle Prisma unique constraint errors (P2002) without using instanceof
  if (err.code === "P2002" && err.meta?.target) {
    const conflictingFields = err.meta.target.join(", ") || "Unknown field";
    statusCode = 409;
    responseError.message = `Conflict error: Duplicate entry found for ${conflictingFields}`;
    responseError.status = ApiResponseStatus.Conflict;
  }

  // Standard error handling
  switch (statusCode) {
    case 400:
      responseError.message =
        err.validationErrors?.join(", ") || "Invalid data";
      responseError.status = ApiResponseStatus.BadRequest;
      break;
    case 404:
      responseError.message = err.message || "Entity not found";
      responseError.status = ApiResponseStatus.NotFound;
      break;
    case 401:
      responseError.message = err.message || "Unauthorized";
      responseError.status = ApiResponseStatus.Unauthorized;
      break;
    case 409:
      responseError.status = ApiResponseStatus.Conflict;
      break;
    default:
      responseError.message = err.message || "Unexpected error";
  }

  res.status(statusCode).json(responseError);
};
