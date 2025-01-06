export const accessTokenConfig = {
	httpOnly: true,
	maxAge: 30 * 60000,
};

export const refreshTokenConfig = {
	httpOnly: true,
	maxAge: 2592000000,
};
