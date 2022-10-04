import ItemRepository from "../domain/repository/ItemRepository";
import Order from "../domain/entity/Order";
import OrderRepository from "../domain/repository/OrderRepository";
import CouponRepository from "../domain/repository/CouponRepository";
import RepositoryFactory from "../domain/factory/RepositoryFactory";

export default class Checkout {
	itemRepository: ItemRepository;
	couponRepository: CouponRepository;
	orderRepository: OrderRepository;

	constructor (repositoryFactory: RepositoryFactory) {
		this.itemRepository = repositoryFactory.createItemRepository();
		this.couponRepository = repositoryFactory.createCouponRepository();
		this.orderRepository = repositoryFactory.createOrderRepository();
	}

	async execute (input: Input): Promise<void> {
		const nextSequence = (await this.orderRepository.count()) + 1;
		const order = new Order(input.cpf, input.date, nextSequence);
		for (const orderItem of input.orderItems) {
			const item = await this.itemRepository.getItem(orderItem.idItem);
			order.addItem(item, orderItem.quantity);
		}
		if (input.coupon) {
			const coupon = await this.couponRepository.getCoupon(input.coupon);
			if (coupon) order.addCoupon(coupon);
		}
		await this.orderRepository.save(order);
	}
}

type Input = {
	cpf: string,
	orderItems: { idItem: number, quantity: number }[],
	coupon?: string,
	date?: Date
}
