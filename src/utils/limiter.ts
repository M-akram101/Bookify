import rateLimit from "express-rate-limit";

export const testLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3, // only 3 requests allowed
  message: "Too many requests for testing, please wait 1 minute",
});
