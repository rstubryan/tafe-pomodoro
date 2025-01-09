export interface UserCookieProps {
	userToken: number;
	username: string;
	email: string;
	role: string;
	exp: number;
	iat: number;
}

export interface UserProps {
	avatar: string;
	createdAt: string;
	email: string;
	id: number;
	password: string;
	role: string;
	updatedAt: string;
	username: string;
}
