import { zodClient } from 'sveltekit-superforms/adapters';
import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
import type { ZodSchema } from 'zod';
import { useQueryClient } from '@tanstack/svelte-query';
import { writable } from 'svelte/store';

export function useForm<T extends ZodSchema>(data: SuperValidated<Infer<T>>, formSchema: T) {
	type FormData = Record<string, never>;

	const form = superForm<FormData>(data as unknown as SuperValidated<FormData>, {
		validators: zodClient(formSchema)
	});

	const { form: formData, enhance } = form;
	let isSubmitting = false;
	const responseMessage = writable('');
	const client = useQueryClient();
	const validateForm = (data: FormData) => formSchema.safeParse(data).success;
	const handleMutation = async (event: Event, mutationFn: () => void) => {
		event.preventDefault();
		event.stopPropagation();
		isSubmitting = true;
		try {
			mutationFn();
		} catch (error) {
			console.error('Error during form submission:', error);
		} finally {
			isSubmitting = false;
		}
	};

	return {
		form,
		formData,
		enhance,
		isSubmitting,
		responseMessage,
		client,
		validateForm,
		handleMutation
	};
}
