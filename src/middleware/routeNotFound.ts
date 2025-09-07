import { Request, Response, NextFunction } from "express";
import { notFound } from "../utils/httpResponses";

// This is your custom 404 handler middleware
export function routeNotFound(req: Request, res: Response, next: NextFunction) {
  const error = new Error("Route Not found");
  // Assuming logging is an imported logger
  console.log(error);
  notFound(res, error.message);
}
