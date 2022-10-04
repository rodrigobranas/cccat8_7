import FreightCalculator from "../domain/entity/FreightCalculator";
import ItemRepository from "../domain/repository/ItemRepository";

export default class SimulateFreight {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (input: Input): Promise<number> {
		let freight = 0;
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			freight += FreightCalculator.calculate(item) * orderItem.quantity;
		}
		return freight;
	}
}

type Input = {
	orderItems: { idItem: number, quantity: number }[]
}