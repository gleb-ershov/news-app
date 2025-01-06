import { JWT_CONFIG } from "../config/jwtConfig";
import { JWTPayload } from "../types/jwt";
import jsonwebtoken from "jsonwebtoken";

export class JWTService {
	static generateAccessToken(payload: Omit<JWTPayload, "iat" | "exp">) {
		const token = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.ACCESS_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
			}
		);

		return token;
	}

	static generateRefreshToken(payload: Omit<JWTPayload, "iat" | "exp">) {
		const token = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.REFRESH_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
			}
		);

		return token;
	}

	static generateTokenPair(payload: Omit<JWTPayload, "iat" | "exp">) {
		const accessToken = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.ACCESS_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn: JWT_CONFIG.ACCESS_TOKEN_EXPIRES_IN,
			}
		);

		const refreshToken = jsonwebtoken.sign(
			payload,
			JWT_CONFIG.REFRESH_TOKEN_SECRET,
			{
				algorithm: "HS256",
				expiresIn: JWT_CONFIG.REFRESH_TOKEN_EXPIRES_IN,
			}
		);

		return { accessToken, refreshToken };
	}

	static verifyAccessToken(token: string): JWTPayload {
		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const decoded = jsonwebtoken.verify(
				token,
				JWT_CONFIG.ACCESS_TOKEN_SECRET
			) as JWTPayload;

			if (!decoded.userId || !decoded.email) {
				console.error("Invalid payload structure:", decoded);
				throw new Error("Invalid token payload structure");
			}

			return decoded;
		} catch (error) {
			if (error instanceof jsonwebtoken.TokenExpiredError) {
				throw new Error("Token has expired");
			}

			throw new Error("Invalid access token");
		}
	}

	static verifyRefreshToken(token: string): JWTPayload {
		if (!token) {
			throw new Error("No token provided");
		}

		try {
			const decoded = jsonwebtoken.verify(
				token,
				JWT_CONFIG.REFRESH_TOKEN_SECRET
			) as JWTPayload;

			if (!decoded.userId || !decoded.email) {
				console.error("Invalid payload structure:", decoded);
				throw new Error("Invalid token payload structure");
			}

			return decoded;
		} catch (error) {
			if (error instanceof jsonwebtoken.TokenExpiredError) {
				throw new Error("Token has expired");
			}

			throw new Error("Invalid refresh token");
		}
	}

	static decodeToken(token: string): JWTPayload | null {
		try {
			const decoded = jsonwebtoken.decode(token) as JWTPayload | null;

			if (decoded && decoded.userId && decoded.email) {
				return decoded;
			}

			return null;
		} catch {
			return null;
		}
	}
}
