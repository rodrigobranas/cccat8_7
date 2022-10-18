import pgp from "pg-promise";
import Connection from "./Connection";

export default class PgPromiseAdapter implements Connection {
	pgp: any;

	constructor () {
		this.pgp = pgp()("postgres://postgres:123456@localhost:5432/app");
	}
	
	query(statement: string, params: any): Promise<any> {
		return this.pgp.query(statement, params);
	}
	
	async close(): Promise<void> {
		this.pgp.$pool.end();
	}
}