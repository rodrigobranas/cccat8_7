import OrderRepository from "../../domain/repository/OrderRepository";
import GetItemGateway from "../gateway/GetItemGateway";

export default class GetOrdersByCpf {

	constructor (readonly orderRepository: OrderRepository, readonly getItemGateway?: GetItemGateway) {
	}

	async execute (cpf: string): Promise<Output[]> {
		const output = [];
		const orders = await this.orderRepository.getByCpf(cpf);
		for (const order of orders) {
			const orderItems: { idItem: number, description: string, quantity: number, price: number }[] = [];
			for (const orderItem of order.orderItems) {
				let description = "";
				if (this.getItemGateway) {
					const item = await this.getItemGateway?.getItem(orderItem.idItem);
					description = item.description;
				}
				orderItems.push({ idItem: orderItem.idItem, quantity: orderItem.quantity, price: orderItem.price, description });
			}
			output.push({ 
				code: order.getCode(), 
				orderItems,
				total: order.getTotal() 
			});
		}
		return output;
	}
}

type Output = {
	code: string,
	orderItems: { idItem: number, description: string, quantity: number, price: number }[],
	total: number
}