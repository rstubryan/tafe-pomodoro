<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { formSchema, type FormSchema } from '$routes/(auth)/login/schema';
	import { type SuperValidated, type Infer } from 'sveltekit-superforms';
	import { LoaderCircle } from 'lucide-svelte';
	import { useForm } from '$lib/hooks/useForm';
	import { useAuthMutation } from '$api/auth/mutation';
	import { get } from 'svelte/store';
	import { Typography } from '../../atoms/Typography';

	let {
		data,
		isFormValid
	}: { data: { form: SuperValidated<Infer<FormSchema>> }; isFormValid?: boolean } = $props();

	let {
		form,
		formData,
		enhance,
		isSubmitting,
		responseMessage,
		client,
		validateForm,
		handleMutation
	} = useForm(data.form, formSchema);

	$effect(() => {
		isFormValid = validateForm($formData);
	});

	const authMutation = useAuthMutation(client, (message) => {
		responseMessage.set(message);
	});
	const handleSubmit = async (event: Event) => {
		await handleMutation(event, () =>
			$authMutation.mutate({
				type: 'login',
				username: get(formData).username,
				password: get(formData).password
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
			{#if $responseMessage}
				<div class="mb-4 text-red-500">{$responseMessage}</div>
			{/if}
			<Form.Field {form} name="username">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label for="username">Username</Form.Label>
						<Input {...props} type="text" bind:value={$formData.username} />
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input {...props} type="password" bind:value={$formData.password} />
					{/snippet}
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
		<Typography className="mb-6 text-center">
			Don't have an account? <a class="font-semibold text-primary" href="/register">Register</a>
		</Typography>
	</form>
</Card.Root>
