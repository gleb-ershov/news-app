import { inject, injectable } from "inversify";
import { LoginDTO, RegisterDTO } from "../types/dtos/authDTO";
import { IUserService } from "./interfaces/userService.interface";
import { JWTService } from "./jwtService";
import { TokenPair } from "../types/jwt";
import NotFoundError from "../domain/errors/NotFoundError";
import { Password } from "../domain/value-objects/password";
import ValidationError from "../domain/errors/ValidationError";

@injectable()
export class AuthService {
	constructor(@inject("UserService") private userService: IUserService) {}

	async register(data: RegisterDTO): Promise<void> {
		await this.userService.createUser(data);
	}

	async login(data: LoginDTO): Promise<TokenPair> {
		const user = await this.userService.findUserByEmail(data.email);
		if (!user) {
			throw new NotFoundError("User with this email was not found");
		}
		const isPasswordValid = await Password.compare(
			data.password,
			user.password
		);
		if (!isPasswordValid) {
			throw new ValidationError("Incorrect password.");
		}

		const tokenPair = JWTService.generateTokenPair({
			userId: user.id,
			email: user.email,
		});
		return tokenPair;
	}
}
