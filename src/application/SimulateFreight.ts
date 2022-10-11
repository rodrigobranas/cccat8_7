import DistanceCalculator from "../domain/entity/DistanceCalculator";
import FreightCalculator from "../domain/entity/FreightCalculator";
import ItemRepository from "../domain/repository/ItemRepository";
import ZipcodeRepository from "../domain/repository/ZipcodeRepository";

export default class SimulateFreight {

	constructor (readonly itemRepository: ItemRepository, readonly zipcodeRepository: ZipcodeRepository) {
	}

	async execute (input: Input): Promise<number> {
		let freight = 0;
		let distance;
		if (input.from && input.to) {
			const from = await this.zipcodeRepository.getByCode(input.from);
			const to = await this.zipcodeRepository.getByCode(input.to);
			distance = DistanceCalculator.calculate(from.coord, to.coord);
		}
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			freight += FreightCalculator.calculate(item, distance) * orderItem.quantity;
		}
		return freight;
	}
}

type Input = {
	orderItems: { idItem: number, quantity: number }[],
	from?: string,
	to?: string
}