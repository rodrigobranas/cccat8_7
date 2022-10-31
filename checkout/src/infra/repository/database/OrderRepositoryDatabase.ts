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
		const [orderData] = await this.connection.query("insert into ccca.order (code, cpf, issue_date, sequence, freight, coupon_code, coupon_percentage, total) values ($1, $2, $3, $4, $5, $6, $7, $8) returning *", [order.getCode(), order.cpf.value, order.date, order.sequence, order.freight, order.coupon?.code, order.coupon?.percentage, order.getTotal()]);
		for (const orderItem of order.orderItems) {
			await this.connection.query("insert into ccca.order_item (id_item, id_order, price, quantity) values ($1, $2, $3, $4)", [orderItem.idItem, orderData.id_order, orderItem.price, orderItem.quantity]);
		}
	}

	async getByCpf(cpf: string): Promise<Order[]> {
		const ordersData = await this.connection.query("select * from ccca.order where cpf = $1", [cpf]);
		const orders: Order[] = [];
		for (const orderData of ordersData) {
			const order = new Order(orderData.cpf, orderData.issue_date, orderData.sequence);
			const orderItemsData = await this.connection.query("select * from ccca.order_item where id_order = $1", [orderData.id_order]);
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

	async count(): Promise<number> {
		const [options] = await this.connection.query("select count(*)::integer as count from ccca.order", []);
		return options.count;
	}

	async clear(): Promise<void> {
		await this.connection.query("delete from ccca.order_item", []);
		await this.connection.query("delete from ccca.order", []);
	}

}