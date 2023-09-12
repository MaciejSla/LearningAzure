import { mysqlConnect } from '$lib/db/mysql';

export async function GET() {
	let connection = await mysqlConnect();

	let results = await connection.query('DESCRIBE employees;').then((results, fields) => {
		console.log(results);
		console.log(fields);
		return results;
	});

	return new Response(results);
}
