import { mysqlConnect } from '$lib/db/mysql';

export async function GET() {
	let connection = await mysqlConnect();

	let results = await connection
		.query(
			'CREATE TABLE IF NOT EXISTS employees(name varchar(20), surname varchar(20), age int, mail varchar(20), phone varchar(9), job varchar(50), education varchar(30), known_languages varchar(20), interests varchar(20))'
		)
		.then((results, fields) => {
			console.log(results);
			console.log(fields);
			return results;
		});

	return new Response(results);
}
