<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$/routes/(auth)/login/schema';
	import { type SuperValidated, type Infer, superForm } from 'sveltekit-superforms';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { useQueryClient } from '@tanstack/svelte-query';
	import { useAuthMutation } from '$api/auth/mutation';

	export let data: SuperValidated<Infer<FormSchema>>;

	const form = superForm(data, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;

	const client = useQueryClient();
	const authMutation = useAuthMutation(client);

	const handleSubmit = async (event: Event) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			$authMutation.mutate({
				type: 'login',
				username: $formData.username,
				password: $formData.password
			});
		} catch (error) {
			console.error('Error during form submission:', error);
		}
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-center text-2xl font-medium">Login</Card.Title>
	</Card.Header>
	<form method="POST" use:enhance onsubmit={handleSubmit}>
		<Card.Content>
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label>Username</Form.Label>
					<Input type="text" {...attrs} bind:value={$formData.username} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control let:attrs>
					<Form.Label>Password</Form.Label>
					<Input type="password" {...attrs} bind:value={$formData.password} />
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
		</Card.Content>
		<Card.Footer>
			<Form.Button class="w-full">Submit</Form.Button>
		</Card.Footer>
	</form>
	<div class="mb-6 text-center">
		<p>
			Don't have an account? <a class="font-semibold text-primary" href="/register">Register</a>
		</p>
	</div>
</Card.Root>
