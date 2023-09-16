import mysql from 'mysql2/promise';
import Knex from 'knex';
import { MYSQL_PASSWORD } from '$env/static/private';

let knexConn = null;

export function knexConnect() {
	if (!knexConn) {
		knexConn = Knex({
			client: 'mysql2',
			connection: {
				host: '127.0.0.1',
				port: 3306,
				user: 'root',
				password: MYSQL_PASSWORD,
				database: 'testdb'
			}
		});
	}
	return knexConn;
}
