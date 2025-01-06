import express from "express";
import mongoose from "mongoose";
const app = express();
import "dotenv/config";
import userRouter from "./routes/userRouter";
import authRouter from "./routes/authRouter";
import cookieParser from "cookie-parser";
import newsRouter from "./routes/newsRouter";

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(userRouter);
app.use(authRouter);
app.use(newsRouter);

const DB_CONNECTION_URL = process.env.DB_CONNECTION_URL as string;

mongoose.connect(DB_CONNECTION_URL);

export default app;
