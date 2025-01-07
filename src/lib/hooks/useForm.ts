import { zodClient } from 'sveltekit-superforms/adapters';
import { superForm, type SuperValidated, type Infer } from 'sveltekit-superforms';
import type { ZodSchema } from 'zod';
import { useQueryClient } from '@tanstack/svelte-query';

export function useForm<T extends ZodSchema>(data: SuperValidated<Infer<T>>, formSchema: T) {
	const form = superForm(data, {
		validators: zodClient(formSchema)
	});
	const { form: formData, enhance } = form;
	let isSubmitting = false;
	const errorMessage = '';
	const client = useQueryClient();
	const validateForm = (data: Infer<T>) => formSchema.safeParse(data).success;
	const handleMutation = async (event: Event, mutationFn: () => void) => {
		event.preventDefault();
		event.stopPropagation();
		isSubmitting = true;
		try {
			await mutationFn();
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
		errorMessage,
		client,
		validateForm,
		handleMutation
	};
}
