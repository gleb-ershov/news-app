import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/authService.interface";
import { accessTokenConfig, refreshTokenConfig } from "../config/cookiesConfig";
import ValidationError from "../domain/errors/ValidationError";
import NotFoundError from "../domain/errors/NotFoundError";

@injectable()
export class AuthController {
	constructor(@inject("AuthService") private authService: IAuthService) {}

	async login(req: Request, res: Response) {
		try {
			const loginCredentials = req.body;
			const { accessToken, refreshToken } = await this.authService.login(
				loginCredentials
			);
			return res
				.cookie("accessToken", accessToken, { ...accessTokenConfig })
				.cookie("refreshToken", refreshToken, { ...refreshTokenConfig })
				.status(200)
				.json("Successfully authenticated");
		} catch (error) {
			if (error instanceof NotFoundError) {
				return res
					.status(404)
					.json("User with this email was not found");
			}

			if (error instanceof ValidationError) {
				return res.status(400).json("Incorrect data");
			}

			return res.status(500).json("Internal server error");
		}
	}

	async register(req: Request, res: Response) {
		try {
			const data = req.body;
			await this.authService.register(data);
		} catch (error) {
			return res.status(500).json("Internal server error");
		}
	}
}
