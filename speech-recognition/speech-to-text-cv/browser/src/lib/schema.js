import { z } from 'zod';

const regex =
	/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export const schema = z.object({
	name: z
		.string({
			required_error: 'Name is required'
		})
		.min(1)
		.regex(regex, {
			message: 'Invalid character in name'
		}),
	surname: z
		.string({
			required_error: 'Surname is required'
		})
		.min(1)
		.regex(regex, {
			message: 'Invalid character in surname'
		}),
	age: z.coerce
		.number({
			required_error: 'Age is required',
			invalid_type_error: 'Age must be a number'
		})
		.gte(18, { message: 'You must be over 18 years old' })
		.lt(100, { message: 'You must be under 100 years old' })
		.default(''),
	mail: z
		.string({
			required_error: 'Email is required'
		})
		.email({ message: 'Invalid email address' }),
	phone: z
		.string()
		.length(9, { message: 'Invalid phone number' })
		.optional()
		.or(z.literal(''))
		.default(''),
	job: z.string(),
	education: z.string(),
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
