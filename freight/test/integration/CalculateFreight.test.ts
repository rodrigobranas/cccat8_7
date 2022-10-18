import CalculateFreight from "../../src/application/CalculateFreight";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import ZipcodeRepositoryDatabase from "../../src/infra/repository/database/ZipcodeRepositoryDatabase";

test("Deve simular o frete", async function () {
	const connection = new PgPromiseAdapter();
	const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
	const calculateFreight = new CalculateFreight(zipcodeRepository);
	const input = {
		orderItems: [
			{ volume: 0.03, density:  100, quantity: 1 }
		]
	}
	const freight = await calculateFreight.execute(input);
	expect(freight).toBe(30);
	await connection.close();
});

test("Deve simular o frete calculando a distância", async function () {
	const connection = new PgPromiseAdapter();
	const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
	const calculateFreight = new CalculateFreight(zipcodeRepository);
	const input = {
		orderItems: [
			{ volume: 0.03, density: 100, quantity: 1 }
		],
		from: "88015600",
		to: "22060030"
	}
	const freight = await calculateFreight.execute(input);
	expect(freight).toBe(22.446653340244893);
	await connection.close();
});
