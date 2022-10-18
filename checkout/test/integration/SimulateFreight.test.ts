import SimulateFreight from "../../src/application/SimulateFreight";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ZipcodeRepositoryDatabase from "../../src/infra/repository/database/ZipcodeRepositoryDatabase";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

test("Deve simular o frete", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)));
	const connection = new PgPromiseAdapter();
	const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
	const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepository);
	const input = {
		orderItems: [
			{ idItem: 1, quantity: 1 }
		]
	}
	const freight = await simulateFreight.execute(input);
	expect(freight).toBe(30);
	await connection.close();
});

test("Deve simular o frete calculando a distância", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)));
	const connection = new PgPromiseAdapter();
	const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
	const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepository);
	const input = {
		orderItems: [
			{ idItem: 1, quantity: 1 }
		],
		from: "88015600",
		to: "22060030"
	}
	const freight = await simulateFreight.execute(input);
	expect(freight).toBe(22.446653340244893);
	await connection.close();
});
