import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order";
import CouponRepository from "../domain/repository/CouponRepository";

export default class Preview {

	constructor (readonly itemRepository: ItemRepository, readonly couponRepository: CouponRepository) {
	}

	async execute (input: Input): Promise<number> {
		const order = new Order(input.cpf, input.date);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
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
	date?: Date
}
