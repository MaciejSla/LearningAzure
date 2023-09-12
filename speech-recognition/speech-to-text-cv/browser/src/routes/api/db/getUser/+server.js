import { mysqlConnect } from '$lib/db/mysql';

export async function POST({ request }) {
	
	let connection = await mysqlConnect();

	const query = '';

	let results = await connection.query('DESCRIBE employees;').then((results, fields) => {
		console.log(results);
		console.log(fields);
		return results;
	});

	return new Response(results);
}
