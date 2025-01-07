import { AxiosInstance } from '../base/axiosInstance';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { createMutation } from '@tanstack/svelte-query';
import { goto } from '$app/navigation';

interface AuthProps {
	type: 'login' | 'register';
	username: string;
	password: string;
	email?: string;
}

const auth = async (data: AuthProps) => {
	const { type, ...rest } = data;
	const endpoint = type === 'login' ? '/signin' : '/signup';
	const response = await AxiosInstance.post(endpoint, rest);
	return response.data;
};

export const useAuthMutation = (client: never) => {
	return createMutation({
		mutationKey: ['auth'],
		mutationFn: auth,
		onSuccess: (data, variables) => {
			if (variables.type === 'login') {
				const token = data.token;
				Cookies.set('token', token, { expires: 1 });
				const decoded = jwtDecode(token);
				Cookies.set('user', JSON.stringify(decoded), { expires: 1 });
				alert(data.message);
				goto('/');
			} else {
				alert(data.message);
				if (confirm('Do you want to login now?')) {
					goto('/login');
				}
			}
			client.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error) => {
			console.error('Authentication failed:', error.message);
			alert(error.response.data.error);
		}
	});
};
