import { z } from "zod";

export const userBaseSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	email: z.string().email("Invalid email format"),
});

export const userSchema = z.object({
	name: z
		.string()
		.min(2, "Name must be at least 2 characters")
		.max(50, "Name must be less than 50 characters"),
	email: z.string().email("Invalid email format"),
	description: z.string().max(500).optional(),
	imageUrl: z.string().url().optional(),
});

export const createUserSchema = userBaseSchema.extend({
	password: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		),
});

export const updateUserSchema = userSchema.partial().extend({
	newPassword: z
		.string()
		.min(8, "Password must be at least 8 characters")
		.regex(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
			"Password must contain at least one uppercase letter, one lowercase letter, and one number"
		)
		.optional(),
});
