import { schema } from '$lib/schema';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async () => {
	const form = await superValidate(schema);

	return { form };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);
		console.log(form);
	}
};
