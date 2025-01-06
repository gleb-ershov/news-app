import { CreateUserDTO, UpdateUserDTO } from "../../types/dtos/userDTO";
import { UserAuthCredentials } from "../../types/userAuthCredentials";
import { UserViewModel } from "../../types/view-models/userViewModel";

export interface IUserService {
	createUser(data: CreateUserDTO): Promise<UserViewModel>;
	deleteUser(userId: string): Promise<void>;
	updateUser(userId: string, data: UpdateUserDTO): Promise<UserViewModel>;
	findUserById(userId: string): Promise<UserViewModel>;
	findUserByEmail(email: string): Promise<UserAuthCredentials>;
}
