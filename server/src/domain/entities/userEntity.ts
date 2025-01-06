import { Password } from "../value-objects/password";

export class UserEntity {
	private _password: Password | null = null;
	constructor(
		public readonly id: string,
		public readonly email: string,
		public readonly name: string,
		public readonly imageUrl?: string,
		public readonly createdAt?: Date,
		public readonly updatedAt?: Date,
		public readonly description?: string
	) {}

	static async create(payload: {
		email: string;
		name: string;
		imageUrl?: string;
		description?: string;
		password: string;
	}) {
		const user = new UserEntity(
			crypto.randomUUID(),
			payload.email,
			payload.name,
			payload.imageUrl,
			new Date(Date.now()),
			new Date(Date.now()),
			payload.description
		);
		await user.setPassword(payload.password);
		return user;
	}

	static reconstitute(payload: {
		id: string;
		email: string;
		name: string;
		imageUrl?: string;
		description?: string;
		createdAt?: Date;
	}) {
		return new UserEntity(
			crypto.randomUUID(),
			payload.email,
			payload.name,
			payload.imageUrl,
			payload.createdAt,
			new Date(Date.now()),
			payload.description
		);
	}

	async setPassword(value: string): Promise<void> {
		this._password = await Password.create(value);
	}

	async comparePassword(plainPassword: string): Promise<boolean> {
		if (!this._password) return false;
		return this._password.compare(plainPassword);
	}

	get passwordHash(): string {
		if (!this._password) throw new Error("Password not set");
		return this._password.getHash();
	}
}
