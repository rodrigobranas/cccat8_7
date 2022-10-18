import OrderItem from "../../src/domain/entity/OrderItem";

test("Deve criar um item do pedido", function () {
	const orderItem = new OrderItem(1, 10, 2);
	expect(orderItem.getTotal()).toBe(20);
});

test("Não deve criar um item do pedido com quantidade negativa", function () {
	expect(() => new OrderItem(1, 10, -1)).toThrow(new Error("Invalid quantity"));
});
