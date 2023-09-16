import { knexConnect } from '$lib/db/knex';
import Treeize from 'treeize';
import { json } from '@sveltejs/kit';

// TODO Get acutal query from client via POST

export async function GET() {
	const people = new Treeize();
	people.setOptions({ output: { prune: false } });
	let knex = await knexConnect();
	const x = await knex('employees')
		.select(
			'employees.*',
			'languages.language as languages:language',
			'interests.interest as interests:interest'
		)
		.leftJoin('languages', 'employees.PersonID', 'languages.PersonID')
		.leftJoin('interests', 'employees.PersonID', 'interests.PersonID')
		.where({ age: 66 });
	people.grow(x);

	const treeized = people.getData().map((x) => ({
		...x,
		languages: Object.values(x.languages).map((y) => y.language),
		interests: Object.values(x.interests).map((y) => y.interest)
	}));

	return json(treeized);
}
