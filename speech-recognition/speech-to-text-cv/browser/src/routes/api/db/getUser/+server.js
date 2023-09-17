import { json } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';

// TODO Get acutal query from client via POST

export async function GET() {
	const prisma = new PrismaClient();

	let users;

	async function main() {
		// ? Create user schema
		// const user = await prisma.employees.create({
		// 	data: {
		// 		name: 'Stefan',
		// 		surname: 'Woźniak',
		// 		age: 73,
		// 		mail: 'steve.wozniak@gmail.com',
		// 		phone: '123456789',
		// 		job: 'wynalazca',
		// 		education: 'UC Berkely College of Engineering',
		// 		known_languages: {
		// 			create: [{ name: 'angielski' }, { name: 'niemiecki' }]
		// 		}
		// 	}
		// });
		// console.log(user);
		const raw = await prisma.employees.findMany({
			include: {
				known_languages: true,
				interests: true
			}
		});
		users = raw.map((x) => ({
			...x,
			known_languages: Object.values(x.known_languages).map((y) => y.name),
			interests: Object.values(x.interests).map((y) => y.name)
		}));
	}

	await main()
		.then(async () => {
			await prisma.$disconnect();
		})
		.catch(async (e) => {
			console.error(e);
			await prisma.$disconnect();
			process.exit(1);
		});

	return json(users);
}
