import { AxiosInstance } from '../base/axiosInstance';
import Cookies from 'js-cookie';
import { createMutation, QueryClient } from '@tanstack/svelte-query';
import { goto } from '$app/navigation';
import type { AuthProps } from './type';
import type { AxiosError } from 'axios';

const auth = async (data: AuthProps) => {
	const { type, ...rest } = data;
	const endpoint = type === 'login' ? '/signin' : '/signup';
	const response = await AxiosInstance.post(endpoint, rest);
	return response.data;
};

export const useAuthMutation = (
	client: QueryClient,
	setErrorMessage: (message: string) => void
) => {
	return createMutation({
		mutationKey: ['auth'],
		mutationFn: auth,
		onSuccess: (data, variables) => {
			if (variables.type === 'login') {
				const token = data.token;
				Cookies.set('token', token, { expires: 1 });
				alert(data.message);
				goto('/dashboard');
			} else {
				alert(data.message);
				if (confirm('Do you want to login now?')) {
					goto('/login');
				}
			}
			client.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error: Error) => {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				setErrorMessage((axiosError.response.data as { error: string }).error);
			} else {
				setErrorMessage('An unknown error occurred');
			}
		}
	});
};
