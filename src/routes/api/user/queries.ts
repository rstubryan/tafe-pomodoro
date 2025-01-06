import { createQuery } from '@tanstack/svelte-query';
import fetchUser, { type UserProps } from './fetcher';

export const useGetUsers = () => {
	return createQuery<UserProps[]>({
		queryKey: ['users'],
		queryFn: () => fetchUser('GET', '/users')
	});
};
