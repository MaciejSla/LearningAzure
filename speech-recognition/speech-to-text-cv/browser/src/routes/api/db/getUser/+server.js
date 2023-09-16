import { knexConnect } from '$lib/db/knex';
import { json } from '@sveltejs/kit';

// TODO Get acutal query from client via POST

export async function GET() {
	let knex = await knexConnect();
	const x = await knex('employees').where({ name: 'Mariusz' });
	console.log(x);
	return json(x);
}
