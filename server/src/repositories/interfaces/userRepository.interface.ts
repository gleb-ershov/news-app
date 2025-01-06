import { UserEntity } from "../../domain/entities/userEntity";
import { UserAuthCredentials } from "../../types/userAuthCredentials";

export interface IUserRepository {
	createUser(data: UserEntity): Promise<UserEntity>;
	deleteUser(userId: string): Promise<void>;
	updateUser(
		userId: string,
		data: Partial<Omit<UserEntity, "id">>
	): Promise<UserEntity | null>;
	findUserById(userId: string): Promise<UserEntity | null>;
	findUserByEmail(email: string): Promise<UserAuthCredentials | null>;
}
