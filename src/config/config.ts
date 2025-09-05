import * as dotenv from "dotenv";

dotenv.config();

export const DEVELOPMENT = process.env.NODE_ENV === "development";

export const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost";
export const SERVER_PORT = process.env.SERVER_PORT;

export const server = {
  SERVER_HOSTNAME,
  SERVER_PORT,
};

export const DATABASE_URL = process.env.DATABASE_URL;
export const LEADERBOARD_PAGE_SIZE = process.env.LEADERBOARD_PAGE_SIZE;
