import { z } from 'zod';

export const schema = z.object({
	name: z
		.string({
			required_error: 'Name is required',
			invalid_type_error: 'Name must contain letters only'
		})
		.min(1),
	surname: z
		.string({
			required_error: 'Surname is required'
		})
		.min(1),
	age: z.coerce
		.number({
			required_error: 'Age is required',
			invalid_type_error: 'Age must be a number'
		})
		.gte(18, { message: 'You must be at least 18' }),
	mail: z
		.string({
			required_error: 'Email is required'
		})
		.email({ message: 'Invalid email address' }),
	phone: z.string().length(9, { message: 'Invalid phone number' }).optional(),
	job: z.string().optional(),
	eductation: z.string().optional(),
	known_languages: z.object({
		create: z.array(
			z
				.object({
					name: z
						.string({
							required_error: 'Field cannot be left blank'
						})
						.min(1)
				})
				.optional()
		)
	}),
	interests: z.object({
		create: z.array(
			z
				.object({
					name: z
						.string({
							required_error: 'Field cannot be left blank'
						})
						.min(1)
				})
				.optional()
		)
	})
});
