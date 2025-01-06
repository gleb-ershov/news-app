import express from "express";
import { container } from "../container/container";
import { AuthController } from "../controllers/authController";
const authRouter = express.Router();

const authController = container.get<AuthController>("AuthController");

authRouter.post("/auth/login", (req, res) => {
	authController.login(req, res);
});

authRouter.post("/auth/register", (req, res) => {
	authController.register(req, res);
});

export default authRouter;
