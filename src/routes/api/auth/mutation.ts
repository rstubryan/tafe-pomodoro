import { AxiosInstance } from '../base/axiosInstance';
import Cookies from 'js-cookie';
import { createMutation, QueryClient } from '@tanstack/svelte-query';
import { goto } from '$app/navigation';
import type { AuthProps } from './type';
import type { AxiosError } from 'axios';
import { toast } from 'svelte-sonner';

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
				toast.success(data.message, {
					description: 'You have successfully logged in.'
				});
				setTimeout(() => {
					goto('/dashboard');
				}, 3000);
			} else {
				toast.success(data.message, {
					description: 'You have successfully signed up.',
					action: {
						label: 'Login Now',
						onClick: () => goto('/login')
					}
				});
			}
			client.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error: Error) => {
			const axiosError = error as AxiosError;
			if (axiosError.response) {
				const errorMessage = (axiosError.response.data as { error: string }).error;
				setErrorMessage(errorMessage);
				toast.error(errorMessage, {
					description: 'Please check your credentials and try again.'
				});
			} else {
				const errorMessage = 'An unknown error occurred';
				setErrorMessage(errorMessage);
				toast.error(errorMessage, {
					description: 'Please try again later.'
				});
			}
		}
	});
};
