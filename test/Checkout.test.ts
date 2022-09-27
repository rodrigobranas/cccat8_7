import Checkout from "../src/application/Checkout";
import GetOrderByCpf from "../src/application/GetOrdersByCpf";
import Preview from "../src/application/Preview";
import Item from "../src/domain/entity/Item";
import ItemRepository from "../src/domain/repository/ItemRepository";
import ItemRepositoryMemory from "../src/infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "../src/infra/repository/memory/OrderRepositoryMemory";

test("Deve fazer o pedido", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000));
	itemRepository.save(new Item(2, "Amplificador", 5000));
	itemRepository.save(new Item(3, "Cabo", 30));
	const orderRepository = new OrderRepositoryMemory();
	const checkout = new Checkout(itemRepository, orderRepository);
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	};
	await checkout.execute(input);
	const getOrdersByCpf = new GetOrderByCpf(orderRepository);
	const orders = await getOrdersByCpf.execute("317.153.361-86");
	expect(orders).toHaveLength(1);
	expect(orders[0].total).toBe(6090);
});