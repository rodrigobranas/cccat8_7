import Coupon from "../../../domain/entity/Coupon";
import Dimension from "../../../domain/entity/Dimension";
import Item from "../../../domain/entity/Item";
import Order from "../../../domain/entity/Order";
import OrderCoupon from "../../../domain/entity/OrderCoupon";
import OrderItem from "../../../domain/entity/OrderItem";
import OrderRepository from "../../../domain/repository/OrderRepository";
import Connection from "../../database/Connection";

export default class OrderRepositoryDatabase implements OrderRepository {

	constructor (readonly connection: Connection) {
	}

	async save(order: Order): Promise<void> {
		// begin
		await this.connection.query("insert into ccca.order (code, cpf, issue_date) values ($1, $2, $3)", [order.getCode(), order.cpf.value, order.date]);
		for (const orderItem of order.orderItems) {
			await this.connection.query("insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $4)", []);
		}
		// commit
	}

	async getByCpf(cpf: string): Promise<Order[]> {
		const ordersData = await this.connection.query("select * from ccca.order where cpf = $1", [cpf]);
		const orders: Order[] = [];
		for (const orderData of ordersData) {
			const order = new Order(orderData.cpf, orderData.issue_date, orderData.sequence);
			const [orderItemsData] = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
			for (const orderItemData of orderItemsData) {
				order.orderItems.push(new OrderItem(orderItemData.id_item, parseFloat(orderItemData.price), orderItemData.quantity));
			}
			if (orderData.coupon_code) {
				order.coupon = new OrderCoupon(orderData.coupon_code, orderData.coupon_percentage);
			}
			order.freight = parseFloat(orderData.freight);
			orders.push(order);
		}
		return orders;
	}

	count(): Promise<number> {
		throw new Error("Method not implemented.");
	}

}