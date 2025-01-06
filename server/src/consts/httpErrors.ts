export enum HttpErrorCode {
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	INTERNAL_SERVER_ERROR = 500,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
}

export enum HttpErrorMessages {
	BAD_REQUEST = "Bad Request",
	UNAUTHORIZED = "Unauthorized",
	FORBIDDEN = "Forbidden",
	NOT_FOUND = "Not Found",
	INTERNAL_SERVER_ERROR = "Internal Server Error",
	SERVICE_UNAVAILABLE = "Service Unavailable",
	GATEWAY_TIMEOUT = "Gateway Timeout",
}

export enum HttpErrorDescriptions {
	BAD_REQUEST = "The request could not be understood or was missing required parameters.",
	UNAUTHORIZED = "Authentication failed or user does not have permissions for the requested operation.",
	FORBIDDEN = "Authentication succeeded, but the authenticated user does not have access to the requested resource.",
	NOT_FOUND = "The requested resource could not be found, but it may be available in the future.",
	INTERNAL_SERVER_ERROR = "An unexpected error occurred on the server.",
	SERVICE_UNAVAILABLE = "The server is currently unavailable (overloaded or down). Try again later.",
	GATEWAY_TIMEOUT = "The server, while acting as a gateway or proxy, did not receive a timely response from the upstream server.",
}
