<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$/routes/(auth)/login/schema';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { LoaderCircle } from 'lucide-svelte';
	import { useForm } from '$lib/hooks/useForm';
	import { useAuthMutation } from '$api/auth/mutation';

	export let data: SuperValidated<Infer<FormSchema>>;
	let {
		form,
		formData,
		enhance,
		isSubmitting,
		errorMessage,
		client,
		validateForm,
		handleMutation
	} = useForm(data, formSchema);
	$: isFormValid = validateForm($formData);
	const authMutation = useAuthMutation(client, (message) => (errorMessage = message));
	const handleSubmit = async (event: Event) => {
		await handleMutation(event, () =>
			$authMutation.mutate({
				type: 'login',
				username: $formData.username,
				password: $formData.password
			})
		);
	};
</script>

<Card.Root>
	<Card.Header>
		<Card.Title class="text-center text-2xl font-medium">Login</Card.Title>
	</Card.Header>
	<form method="POST" use:enhance onsubmit={handleSubmit}>
		<Card.Content>
			{#if errorMessage}
				<div class="mb-4 text-red-500">{errorMessage}</div>
			{/if}
			<Form.Field {form} name="username">
				<Form.Control let:attrs>
					<Form.Label for="username">Username</Form.Label>
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
			{#if isSubmitting}
				<Form.Button class="w-full animate-pulse">
					<LoaderCircle class="animate-spin" />
				</Form.Button>
			{:else}
				<Form.Button class="w-full" disabled={!isFormValid}>Submit</Form.Button>
			{/if}
		</Card.Footer>
		<div class="mb-6 text-center">
			<p>
				Don't have an account? <a class="font-semibold text-primary" href="/register">Register</a>
			</p>
		</div>
	</form>
</Card.Root>
