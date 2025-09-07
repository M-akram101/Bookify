import express from "express";

//Configuration
import { server } from "./config/config";

//Middleware
import { routeNotFound } from "./middleware/routeNotFound";
import { errorHandler } from "./middleware/errorHandler";

//Routes
import bookRoutes from "./features/book/book.routes";
import borrowerRoutes from "./features/borrower/borrower.routes";
import bookBorrowerRoutes from "./features/bookBorrower/bookBorrower.routes";

export const application = express();

const setupMiddleware = () => {
  // Parse incoming requests with JSON and URL encoding
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());
};

const setupRoutes = () => {
  application.use("/api/books", bookRoutes);
  application.use("/api/borrowers", borrowerRoutes);
  application.use("/api/book-borrowers", bookBorrowerRoutes);
};

const setupErrorHandling = () => {
  // Handle errors such as 404 (Route not found)
  application.use(routeNotFound);

  // Use generic error handler for unexpected errors
  application.use(errorHandler); // This will catch all errors and respond appropriately
};

const startServer = () => {
  application.listen(server.SERVER_PORT, () => {
    console.log(
      `✅ Server started on ${server.SERVER_HOSTNAME}:${server.SERVER_PORT}`
    );
  });
};

export const Main = async () => {
  setupMiddleware();
  setupRoutes();
  setupErrorHandling();

  // Start the server
  startServer();
};

// Execute the Main function to start the application
Main();
