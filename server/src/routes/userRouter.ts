import express from "express";
import { UserController } from "../controllers/userController";
import { container } from "../container/container";
const userRouter = express.Router();

const userController = container.get<UserController>("UserController");

userRouter.get("/users/:id", (req, res) => {
	userController.getUserById(req, res);
});

userRouter.post("/users", (req, res) => {
	userController.createUser(req, res);
});

userRouter.delete("/users/:id", (req, res) => {
	userController.deleteUser(req, res);
});

userRouter.put("/users/:id", (req, res) => {
	userController.updateUser(req, res);
});

export default userRouter;
