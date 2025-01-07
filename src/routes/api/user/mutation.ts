import { createMutation } from '@tanstack/svelte-query';
import fetchUser from './fetcher';

export function useAddUserMutation(client: never) {
	return createMutation({
		mutationFn: (user: UserProps) => fetchUser('POST', '/users', user),
		onSuccess: () => client.invalidateQueries({ queryKey: ['users'] })
	});
}

export function useUpdateUserMutation(client: never) {
	return createMutation({
		mutationFn: (user: UserProps) => fetchUser('PUT', `/users/${user.id}`, user),
		onSuccess: () => client.invalidateQueries({ queryKey: ['users'] })
	});
}

export function useDeleteUserMutation(client: never) {
	return createMutation({
		mutationFn: (id: number) => fetchUser('DELETE', `/users/${id}`),
		onSuccess: () => client.invalidateQueries({ queryKey: ['users'] })
	});
}
