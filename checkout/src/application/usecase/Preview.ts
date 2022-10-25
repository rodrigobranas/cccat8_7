import Order from "../../domain/entity/Order";
import CouponRepository from "../../domain/repository/CouponRepository";
import CalculateFreightGateway from "../gateway/CalculateFreightGateway";
import GetItemGateway from "../gateway/GetItemGateway";

export default class Preview {

	constructor (
		readonly couponRepository: CouponRepository, 
		readonly getItemGateway: GetItemGateway,
		readonly calculateFreightGateway: CalculateFreightGateway
	) {
	}

	async execute (input: Input): Promise<number> {
		const orderItems = [];
		const order = new Order(input.cpf, input.date);
		for (const orderItem of input.orderItems) {
			const item = await this.getItemGateway.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
			orderItems.push({ volume: item.getVolume(), density: item.getDensity(), quantity: orderItem.quantity });
		}
		order.freight = await this.calculateFreightGateway.calculate(orderItems, input.from, input.to);
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
