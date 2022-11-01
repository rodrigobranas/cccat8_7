import Item from "./Item";
import Observable from "./Observable";
import OrderItem from "./OrderItem";

export default class Order extends Observable {
	orderItems: OrderItem[];
	coupon: string = "";

	constructor (readonly cpf: string) {
		super();
		this.orderItems = [];
	}

	addItem (item: Item) {
		const existingOrderItem = this.orderItems.find((orderItem: OrderItem) => orderItem.idItem === item.idItem);
		if (existingOrderItem) {
			existingOrderItem.quantity++;
		} else {
			this.orderItems.push(new OrderItem(item.idItem, 1));
		}
		this.notify("addItem");
	}
	
	removeOrderItem (orderItem: OrderItem) {
		const existingOrderItem = this.orderItems.find((o: OrderItem) => o.idItem === orderItem.idItem);
		if (existingOrderItem) {
			existingOrderItem.quantity--;
			if (existingOrderItem.quantity === 0) {
				this.orderItems.splice(this.orderItems.indexOf(existingOrderItem), 1);
			}
		}
		this.notify("removeOrderItem");
	}
}