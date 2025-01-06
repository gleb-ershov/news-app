export interface AppError extends Error {
	statusCode: number;
	isOperational: boolean;
	stack?: string;
	description: string;
}
