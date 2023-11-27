import dotenv from "dotenv";

dotenv.config();

export const MONGODB_URI =  process.env.MONGODB_URI;
export const PORT = process.env.PORT;
export const SECRET_KEY = process.env.SECRET_KEY;
export const HOST = process.env.HOST;

export const host = 'http://localhost';
export const port = 4000;
