import ItemRepository from "../../domain/repository/ItemRepository";
import Order from "../../domain/entity/Order";
import OrderRepository from "../../domain/repository/OrderRepository";
import CouponRepository from "../../domain/repository/CouponRepository";
import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CalculateFreightGateway from "../gateway/CalculateFreightGateway";
import GetItemGateway from "../gateway/GetItemGateway";
import DecrementStockGateway from "../gateway/DecrementStockGateway";
import Queue from "../../infra/queue/Queue";
import OrderPlaced from "../../domain/event/OrderPlaced";

export default class Checkout {
	couponRepository: CouponRepository;
	orderRepository: OrderRepository;

	constructor (
		repositoryFactory: RepositoryFactory,
		readonly getItemGateway: GetItemGateway,
		readonly calculateFreightGateway: CalculateFreightGateway,
		readonly decrementStockGateway: DecrementStockGateway,
		readonly queue: Queue
	) {
		this.couponRepository = repositoryFactory.createCouponRepository();
		this.orderRepository = repositoryFactory.createOrderRepository();
	}

	async execute (input: Input): Promise<void> {
		const nextSequence = (await this.orderRepository.count()) + 1;
		const order = new Order(input.cpf, input.date, nextSequence);
		const orderItems = [];
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
		await this.orderRepository.save(order);
		await this.queue.publish("orderPlaced", new OrderPlaced(order));
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
