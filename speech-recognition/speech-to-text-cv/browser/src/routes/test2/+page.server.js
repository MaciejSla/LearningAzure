import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';

const schema = z.object({
	tags: z
		.object({
			id: z.number().int().min(1),
			name: z.string().min(2)
		})
		.array()
});

const tags = [{ id: 1, name: 'test' }];

export const load = async () => {
	const form = await superValidate({ tags }, schema);
	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);
		console.log(form);
	}
};
