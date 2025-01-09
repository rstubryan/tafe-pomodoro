export interface AuthProps {
	type: 'login' | 'register';
	username: string;
	password: string;
	email?: string;
}
