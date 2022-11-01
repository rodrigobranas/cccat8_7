import Connection from "../../infra/database/Connection";

export default class GetOrdersByCpfQuery {

	constructor (readonly connection: Connection) {
	}

	async execute (cpf: string): Promise<Output[]> {
		const getOrdersByCpfDTO = await this.connection.query("select * from ccca.item join ccca.order_item using (id_item) join ccca.order using (id_order) where cpf = $1", [cpf]);
		return getOrdersByCpfDTO;
	}
}

type Output = {
	code: string,
	orderItems: { idItem: number, description: string, quantity: number, price: number }[],
	total: number
}