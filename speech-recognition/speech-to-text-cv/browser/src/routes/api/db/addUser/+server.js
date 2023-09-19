import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function POST({ request }) {
	const user = await request.json();
	const mail = user.mail;

	async function main() {
		const mailExists = await prisma.employees.findUnique({
			where: {
				mail
			}
		});
		if (mailExists) {
			return new Response('User with this email already exists', { status: 400 });
		}
		const createdUser = await prisma.employees.create({
			data: user
		});
		console.log(createdUser);
		return json(createdUser);
	}

	return await main();
}
