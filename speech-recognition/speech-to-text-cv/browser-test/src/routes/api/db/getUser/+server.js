import { json } from '@sveltejs/kit';
import { prisma } from '$lib/prisma';

export async function POST({ request }) {
	const filter = await request.json();
	filter.AND = [];
	if (filter.known_languages) {
		filter.known_languages.map((x) => {
			filter.AND.push({
				known_languages: {
					some: {
						name: x
					}
				}
			});
		});
		delete filter.known_languages;
	}
	if (filter.interests) {
		filter.interests.map((x) => {
			filter.AND.push({
				interests: {
					some: {
						name: x
					}
				}
			});
		});
		delete filter.interests;
	}

	async function main() {
		const raw = await prisma.employees.findMany({
			include: {
				known_languages: true,
				interests: true
			},
			where: filter
		});
		const users = raw.map((x) => ({
			...x,
			known_languages: Object.values(x.known_languages).map((y) => y.name),
			interests: Object.values(x.interests).map((y) => y.name)
		}));
		return json(users);
	}

	return await main();
}
