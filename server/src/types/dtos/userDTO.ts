export interface UserDTO {
	id: string;
	name: string;
	email: string;
	imageUrl: string;
	description: string;
}

export interface CreateUserDTO {
	name: string;
	password: string;
	email: string;
}

export interface UpdateUserDTO extends Partial<Omit<UserDTO, "id">> {
	password?: string;
}
