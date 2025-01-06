import { AppError as AppErrorType } from "./../../types/error";

class AppError extends Error implements AppErrorType {
	statusCode: number;
	isOperational: boolean;
	description: string;

	constructor(
		message: string,
		description: string,
		statusCode: number,
		isOperational: boolean = true
	) {
		super(message);
		this.description = description;
		this.statusCode = statusCode;
		this.isOperational = isOperational;
		this.stack = new Error().stack;
		Object.setPrototypeOf(this, new.target.prototype);
	}
}

export default AppError;
