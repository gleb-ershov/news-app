import { UserMapper } from "./../mappers/userMapper";
import { UserEntity } from "../domain/entities/userEntity";
import { IUserRepository } from "./interfaces/userRepository.interface";
import { UserModel, IUser } from "../models/userModel";
import DatabaseError from "../domain/errors/DatabaseError";
import { UserAuthCredentials } from "../types/userAuthCredentials";

export class UserRepository implements IUserRepository {
	async createUser(data: UserEntity): Promise<UserEntity> {
		try {
			const newUser: IUser = await UserModel.create({
				...data,
				password: data.passwordHash,
			});
			return UserMapper.toEntity(newUser);
		} catch (error) {
			console.error("Database error:", error);
			throw new DatabaseError("Error occurred while creating user.");
		}
	}

	async updateUser(
		userId: string,
		data: Omit<Partial<UserEntity>, "id">
	): Promise<UserEntity | null> {
		try {
			const updatedUser = await UserModel.findOneAndUpdate(
				{
					_id: userId,
				},
				{ ...data, updatedAt: new Date() },
				{ new: true }
			);

			if (!updatedUser) {
				return null;
			}

			return UserMapper.toEntity(updatedUser);
		} catch (error) {
			console.error("Database error:", error);
			throw new DatabaseError("Error occurred while updating user.");
		}
	}

	async findUserById(userId: string): Promise<UserEntity | null> {
		try {
			const user = await UserModel.findById(userId);

			if (!user) {
				return null;
			}

			return UserMapper.toEntity(user);
		} catch (error) {
			console.error("Database error:", error);
			throw new DatabaseError("Error occurred while fetching user.");
		}
	}

	async findUserByEmail(email: string): Promise<UserAuthCredentials | null> {
		try {
			const user = await UserModel.findOne({ email });
			if (!user) {
				return null;
			}
			return UserMapper.toAuthCredentials(user);
		} catch (error) {
			console.error("Database error:", error);
			throw new DatabaseError("Error occurred while fetching user.");
		}
	}

	async deleteUser(userId: string): Promise<void> {
		try {
			await UserModel.findByIdAndDelete(userId);
		} catch (error) {
			console.error("Database error:", error);
		}
	}
}
