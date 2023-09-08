import mysql from 'mysql2/promise';
import { MYSQL_PASSWORD } from '$env/static/private';

let mysqlconn = null;

export function mysqlConnect() {
	if (!mysqlconn) {
		mysqlconn = mysql.createConnection({
			host: 'localhost',
			user: 'root',
			password: MYSQL_PASSWORD,
			database: 'testdb'
		});
	}
	return mysqlconn;
}
