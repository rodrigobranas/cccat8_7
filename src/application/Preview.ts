import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order";

export default class Preview {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (input: Input): Promise<number> {
		const order = new Order(input.cpf);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		const total = order.getTotal();
		return total;
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[]
}
