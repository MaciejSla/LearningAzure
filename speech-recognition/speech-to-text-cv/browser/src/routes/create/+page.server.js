import { schema } from '$lib/schema';
import { fail } from '@sveltejs/kit';
import axios from 'axios';
import { message, superValidate } from 'sveltekit-superforms/server';
import { prisma } from '$lib/prisma';

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
			const user = form.data;
			const mail = user.mail;

			async function main() {
				const mailExists = await prisma.employees.findUnique({
					where: {
						mail
					}
				});
				if (mailExists) {
					return message(form, 'User with this email already exists', { status: 400 });
				}
				const createdUser = await prisma.employees.create({
					data: user
				});
				console.log(createdUser);
				return message(empty, 'User added!');
			}

			return await main();
		}
	}
};
