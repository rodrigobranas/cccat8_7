import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order";
import OrderRepository from "../domain/repository/OrderRepository";

export default class Checkout {

	constructor (readonly itemRepository: ItemRepository, readonly orderRepository: OrderRepository) {
	}

	async execute (input: Input): Promise<void> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		await this.orderRepository.save(order);
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[]
}
