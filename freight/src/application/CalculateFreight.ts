import DistanceCalculator from "../domain/entity/DistanceCalculator";
import FreightCalculator from "../domain/entity/FreightCalculator";
import ZipcodeRepository from "../domain/repository/ZipcodeRepository";

export default class CalculateFreight {

	constructor (readonly zipcodeRepository: ZipcodeRepository) {
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
			freight += FreightCalculator.calculate(orderItem.volume, orderItem.density, distance) * orderItem.quantity;
		}
		console.log(new Date(), "CalculateFreight");
		return freight;
	}
}

type Input = {
	orderItems: { volume: number, density: number, quantity: number }[],
	from?: string,
	to?: string
}