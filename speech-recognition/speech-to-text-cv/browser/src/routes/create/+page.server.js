import { schema } from '$lib/schema';
import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = async (event) => {
	const form = await superValidate(event, schema);

	return { form, message: '' };
};

export const actions = {
	default: async (event) => {
		const form = await superValidate(event, schema);
		console.log(form);

		if (!form.valid) {
			return fail(400, {
				form
			});
		} else {
			const empty = await superValidate(schema);
			const filter = {};
			for (const i of Object.keys(form.data)) {
				if (form.data[i] != '' && form.data[i] != undefined) {
					filter[i] = form.data[i];
					// delete form.data[i];
				}
			}
			console.log(filter);
			return message(empty, 'User added!');
		}
	}
};
