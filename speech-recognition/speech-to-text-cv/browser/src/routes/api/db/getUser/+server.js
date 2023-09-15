import { mysqlConnect } from '$lib/db/mysql';
import { json } from '@sveltejs/kit';

// TODO Get acutal query from client via POST
// export async function POST({ request }) {
// 	let connection = await mysqlConnect();

// 	const query = '';

// 	let results = await connection.query('DESCRIBE employees;').then((results, fields) => {
// 		console.log(results);
// 		console.log(fields);
// 		return results;
// 	});

// 	return new Response(results);
// }

export async function GET() {
	let connection = await mysqlConnect();

	const query = 'SELECT * FROM employees;';

	let results = await connection.query(query).then((results, fields) => {
		console.log(results);
		console.log(fields);
		return results;
	});
	return json(results[0]);
}
