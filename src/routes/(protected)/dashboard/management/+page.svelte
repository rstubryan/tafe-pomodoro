<script lang="ts">
	import * as Table from '$lib/components/ui/table';
	import { useGetUsers } from '$api/user/queries';
	import type { UserCookieProps, UserProps } from '$routes/api/user/type';
	let { data, users } = $props<{ user: UserCookieProps; users: UserProps }>();

	$effect(() => {
		users = useGetUsers();
		console.log($users.data);
	});
</script>

<h1>Protected Dashboard Management as {data.user.role}</h1>
{#if data.user}
	{#if data.user.role === 'ADMIN'}
		<Table.Root>
			<Table.Caption>A list of your recent invoices.</Table.Caption>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">Avatar</Table.Head>
					<Table.Head>Username</Table.Head>
					<Table.Head>Email</Table.Head>
					<Table.Head>Role</Table.Head>
					<Table.Head>Created At</Table.Head>
					<Table.Head>Updated At</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#if $users && $users.data}
					{#each $users.data as user}
						<Table.Row>
							<Table.Cell><img src={user.avatar} alt={user.username} width="30" /></Table.Cell>
							<Table.Cell>{user.username}</Table.Cell>
							<Table.Cell>{user.email}</Table.Cell>
							<Table.Cell>{user.role}</Table.Cell>
							<Table.Cell>{new Date(user.createdAt).toLocaleString()}</Table.Cell>
							<Table.Cell>{new Date(user.updatedAt).toLocaleString()}</Table.Cell>
						</Table.Row>
					{/each}
				{/if}
			</Table.Body>
		</Table.Root>
	{:else if data.user.role === 'USER'}
		<p>User: {data.user.username}</p>
	{:else}
		<p>Prohibited</p>
	{/if}
{/if}
