import { NextFunction, Request, Response } from "express";
import { JWTService } from "../services/jwtService";
import UnauthorizedError from "../domain/errors/UnauthorizedError";
import { accessTokenConfig, refreshTokenConfig } from "../config/cookiesCOnfig";

export const authMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const cookieAccessToken = req.cookies["accessToken"];
	const cookieRefreshToken = req.cookies["refreshToken"];

	if (!cookieRefreshToken) {
		return res
			.status(401)
			.json({ message: "Unauthorized, Refresh token missing" });
	}

	try {
		try {
			JWTService.verifyAccessToken(cookieAccessToken);
		} catch (error) {
			try {
				JWTService.verifyRefreshToken(cookieRefreshToken);
				const decoded = JWTService.decodeToken(cookieRefreshToken);
				if (!decoded) {
					throw new UnauthorizedError(
						"Failded decoding refresh token."
					);
				}
				const { userId, email } = decoded;
				const { accessToken, refreshToken } =
					JWTService.generateTokenPair({
						userId,
						email,
					});
				return res
					.cookie("accessToken", accessToken, {
						...accessTokenConfig,
					})
					.cookie("accessToken", refreshToken, {
						...refreshTokenConfig,
					});
			} catch (error) {
				return res.status(401).json({ message: "Unauthorized" });
			}
		}
	} catch (error) {
		return res.status(500).json({ message: "Internal Server Error" });
	}
	next();
};
