import { TokenPair } from "./../../types/jwt";
import { LoginDTO, RegisterDTO } from "../../types/dtos/authDTO";

export interface IAuthService {
	login(data: LoginDTO): Promise<TokenPair>;
	register(data: RegisterDTO): Promise<void>;
	// refreshToken(data: string): Promise<TokenPair>;
}
