import { UserEntity } from "../domain/entities/userEntity";
import { IUser, IUserWithPassword } from "../models/userModel";
import { UserAuthCredentials } from "../types/userAuthCredentials";
import { UserViewModel } from "../types/view-models/userViewModel";

export class UserMapper {
	static toEntity(model: IUser): UserEntity {
		const { _id, email, name, imageUrl, description, createdAt } = model;
		return UserEntity.reconstitute({
			id: _id as string,
			email,
			name,
			imageUrl,
			description,
			createdAt,
		});
	}

	static toAuthCredentials(user: IUserWithPassword): UserAuthCredentials {
		return {
			id: user._id as string,
			email: user.email,
			password: user.password,
		};
	}

	static toMongo(entity: UserEntity): IUser {
		const { id, name, email, imageUrl, description, createdAt, updatedAt } =
			entity;
		return {
			_id: id,
			name,
			email,
			imageUrl,
			description,
			createdAt,
			updatedAt,
		};
	}

	static toViewModel(entity: UserEntity): UserViewModel {
		const { id, name, email, imageUrl, description } = entity;
		return {
			id,
			name,
			email,
			imageUrl,
			description,
		};
	}

	static toEntityList(models: IUser[]): UserEntity[] {
		return models.map((user) => UserMapper.toEntity(user));
	}

	static toMongoList(entities: UserEntity[]): IUser[] {
		return entities.map((user) => UserMapper.toMongo(user));
	}

	static toViewModelList(entities: UserEntity[]): UserViewModel[] {
		return entities.map((user) => UserMapper.toViewModel(user));
	}
}
