import { z } from 'zod';

export const formSchema = z.object({
	username: z
		.string()
		.min(2, { message: 'Username must be at least 2 characters long' })
		.max(50, { message: 'Username must be at most 50 characters long' }),
	email: z.string().email({ message: 'Invalid email address' }),
	password: z
		.string()
		.min(8, { message: 'Password must be at least 8 characters long' })
		.max(50, { message: 'Password must be at most 50 characters long' })
});

export type FormSchema = typeof formSchema;
