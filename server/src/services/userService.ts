import { inject, injectable } from "inversify";
import { UserEntity } from "../domain/entities/userEntity";
import { IUserRepository } from "../repositories/interfaces/userRepository.interface";
import { UserMapper } from "../mappers/userMapper";
import NotFoundError from "../domain/errors/NotFoundError";
import InternalServerError from "../domain/errors/InternalServerError";
import ValidationError from "../domain/errors/ValidationError";
import { UserViewModel } from "../types/view-models/userViewModel";
import { CreateUserDTO, UpdateUserDTO } from "../types/dtos/userDTO";
import DatabaseError from "../domain/errors/DatabaseError";
import { UserAuthCredentials } from "../types/userAuthCredentials";

@injectable()
export class UserService {
	constructor(
		@inject("UserRepository") private userRepository: IUserRepository
	) {}

	async createUser(data: CreateUserDTO): Promise<UserViewModel> {
		try {
			const _email = data.email;
			const existingUser = await this.userRepository.findUserByEmail(
				_email
			);

			if (existingUser) {
				throw new ValidationError("User with this email already exist");
			}
			const newUserEntity = await UserEntity.create(data);
			const user = await this.userRepository.createUser(newUserEntity);
			return UserMapper.toViewModel(user);
		} catch (error) {
			if (error instanceof ValidationError) {
				throw error;
			}

			if (error instanceof DatabaseError) {
				throw error;
			}

			throw new InternalServerError();
		}
	}

	async findUserById(userId: string): Promise<UserViewModel> {
		try {
			const user = await this.userRepository.findUserById(userId);

			if (!user) {
				throw new NotFoundError();
			}

			return UserMapper.toViewModel(user);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async findUserByEmail(email: string): Promise<UserAuthCredentials> {
		try {
			const user = await this.userRepository.findUserByEmail(email);

			if (!user) {
				throw new NotFoundError();
			}
			return user;
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async updateUser(
		userId: string,
		data: Partial<Omit<UpdateUserDTO, "id">>
	): Promise<UserViewModel> {
		try {
			console.log("DATA IN UODATE", data);
			const user = await this.userRepository.updateUser(userId, data);

			if (!user) {
				throw new NotFoundError();
			}

			return UserMapper.toViewModel(user);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}

	async deleteUser(userId: string): Promise<void> {
		try {
			const user = this.userRepository.findUserById(userId);

			if (!user) {
				throw new NotFoundError();
			}

			await this.userRepository.deleteUser(userId);
		} catch (error) {
			if (error instanceof NotFoundError) {
				throw error;
			}
			throw new InternalServerError();
		}
	}
}
