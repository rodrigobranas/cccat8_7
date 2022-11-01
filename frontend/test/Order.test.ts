import Item from "../src/entities/Item";
import Observer from "../src/entities/Observer";
import Order from "../src/entities/Order";

test("Deve criar um pedido", function () {
	const order = new Order("317.153.361-86");
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	expect(order.orderItems).toHaveLength(1);
	expect(order.orderItems[0].quantity).toBe(3);
	order.removeOrderItem(order.orderItems[0]);
	expect(order.orderItems[0].quantity).toBe(2);
});

test("Deve criar um pedido e lançar eventos", function () {
	const order = new Order("317.153.361-86");
	const addItemEvents: {}[] = [];
	const removeOrderItemsEvents: {}[] = [];
	order.register(new Observer("addItem", function () {
		addItemEvents.push({});
	}));
	order.register(new Observer("removeOrderItem", function () {
		removeOrderItemsEvents.push({});
	}));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	order.addItem(new Item(1, "Guitarra", 1000));
	expect(order.orderItems).toHaveLength(1);
	expect(order.orderItems[0].quantity).toBe(3);
	order.removeOrderItem(order.orderItems[0]);
	expect(order.orderItems[0].quantity).toBe(2);
	expect(addItemEvents).toHaveLength(3);
	expect(removeOrderItemsEvents).toHaveLength(1);
});
