import { inject, injectable } from "inversify";
import { Request, Response } from "express";
import { IAuthService } from "../services/interfaces/authService.interface";
import { accessTokenConfig, refreshTokenConfig } from "../config/cookiesCOnfig";
import InternalServerError from "../domain/errors/InternalServerError";

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
			throw new InternalServerError();
		}
	}

	async register(req: Request, res: Response) {
		try {
			const data = req.body;
			await this.authService.register(data);
		} catch (error) {}
	}

	async refreshToken(req: Request, res: Response) {
		try {
		} catch (error) {}
	}
}
