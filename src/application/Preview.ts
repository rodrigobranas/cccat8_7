import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order";
import CouponRepository from "../domain/repository/CouponRepository";
import FreightCalculator from "../domain/entity/FreightCalculator";
import ZipcodeRepository from "../domain/repository/ZipcodeRepository";
import DistanceCalculator from "../domain/entity/DistanceCalculator";

export default class Preview {

	constructor (readonly itemRepository: ItemRepository, readonly couponRepository: CouponRepository, readonly zipcodeRepository: ZipcodeRepository) {
	}

	async execute (input: Input): Promise<number> {
		let distance;
		if (input.from && input.to) {
			const from = await this.zipcodeRepository.getByCode(input.from);
			const to = await this.zipcodeRepository.getByCode(input.to);
			distance = DistanceCalculator.calculate(from.coord, to.coord);
		}
		const order = new Order(input.cpf, input.date);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
			order.freight += FreightCalculator.calculate(item, distance) * orderItem.quantity;
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.getCoupon(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		const total = order.getTotal();
		return total;
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[],
	coupon?: string,
	date?: Date,
	from?: string,
	to?: string
}
