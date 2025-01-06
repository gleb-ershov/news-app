import * as bcrypt from "bcrypt";

export class Password {
	private constructor(private readonly hash: string) {}
	static async create(password: string): Promise<Password> {
		if (!this.isValid(password)) {
			throw new Error("Password must be at least 8 characters long");
		}
		const hash = await bcrypt.hash(password, 10);
		return new Password(hash);
	}

	static fromHash(hash: string): Password {
		return new Password(hash);
	}

	private static isValid(password: string): boolean {
		return password.length >= 8;
	}

	static async compare(
		plainPassword: string,
		hashedPassword: string
	): Promise<boolean> {
		return bcrypt.compare(plainPassword, hashedPassword);
	}

	getHash(): string {
		return this.hash;
	}
}
