import { model, Document, Schema } from "mongoose";

interface IUser extends Pick<Document, "_id"> {
	name: string;
	email: string;
	imageUrl?: string;
	description?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

interface IUserWithPassword extends IUser {
	password: string;
}

const userSchema = new Schema<IUserWithPassword>({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	imageUrl: { type: String, required: false },
	description: { type: String, required: false },
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now },
});

userSchema.pre("save", function (next) {
	if (this.isModified()) {
		this.updatedAt = new Date();
	}
	next();
});

const UserModel = model<IUserWithPassword>("User", userSchema);

export { UserModel, IUser, IUserWithPassword };
