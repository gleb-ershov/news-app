import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IUserService } from "../services/interfaces/userService.interface";
import {
	createUserSchema,
	updateUserSchema,
} from "../types/schemas/userSchemas";
import { HttpErrorCode, HttpErrorMessages } from "../consts/httpErrors";
import NotFoundError from "../domain/errors/NotFoundError";
import ValidationError from "../domain/errors/ValidationError";

@injectable()
export class UserController {
	constructor(@inject("UserService") private userService: IUserService) {}

	async createUser(req: Request, res: Response) {
		try {
			const userData = req.body;

			const parseResult = createUserSchema.safeParse(userData);

			if (!parseResult.success) {
				return res
					.status(HttpErrorCode.BAD_REQUEST)
					.json(parseResult.error.flatten());
			}
			const user = await this.userService.createUser(parseResult.data);

			return res.status(201).json(user);
		} catch (error) {
			return res.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
				message: HttpErrorMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}

	async updateUser(req: Request, res: Response) {
		try {
			const userId = req.params.id;
			const userData = req.body;
			const parseResult = updateUserSchema.safeParse(userData);

			if (!parseResult.success) {
				return res
					.status(HttpErrorCode.BAD_REQUEST)
					.json(parseResult.error.flatten());
			}
			const updatedUser = await this.userService.updateUser(
				userId,
				parseResult.data
			);

			return res.status(201).json(updatedUser);
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			if (error instanceof ValidationError) {
				return res
					.status(HttpErrorCode.BAD_REQUEST)
					.json(error.message);
			}

			return res.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
				message: HttpErrorMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}

	async getUserById(req: Request, res: Response) {
		try {
			const userId = req.params.id;
			const user = await this.userService.findUserById(userId);

			if (!user) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			return res.status(200).json(user);
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			return res.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
				message: HttpErrorMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}

	async getUserByEmail(req: Request, res: Response) {
		try {
			const userEmail = req.body;
			const user = await this.userService.findUserByEmail(userEmail);

			if (!user) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			return res.status(200).json(user);
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			return res.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
				message: HttpErrorMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}

	async deleteUser(req: Request, res: Response) {
		try {
			const userId = req.params.id;
			const user = await this.userService.findUserById(userId);

			if (!user) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			await this.userService.deleteUser(userId);
			return res.status(200).json("User successfully deleted");
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res
					.status(HttpErrorCode.NOT_FOUND)
					.json("User with this id was not found.");
			}

			return res.status(HttpErrorCode.INTERNAL_SERVER_ERROR).json({
				message: HttpErrorMessages.INTERNAL_SERVER_ERROR,
			});
		}
	}
}
