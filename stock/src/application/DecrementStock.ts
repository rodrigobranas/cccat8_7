import StockEntry from "../domain/entity/StockEntry";
import StockRepository from "../domain/repository/StockRepository"

export default class DecrementStock {

	constructor (readonly stockRepository: StockRepository) {
	}

	async execute (input: Input): Promise<void> {
		console.log(new Date(), "DecrementStock");
		for (const orderItem of input.order.orderItems) {
			await this.stockRepository.save(new StockEntry(orderItem.idItem, "out", orderItem.quantity));
		}
	}
}

type Input = {
	order: {
		orderItems: { idItem: number, quantity: number }[]
	}
}
