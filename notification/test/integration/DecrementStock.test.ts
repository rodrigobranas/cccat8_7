import DecrementStock from "../../src/application/DecrementStock";
import GetStock from "../../src/application/GetStock";
import StockEntry from "../../src/domain/entity/StockEntry";
import PgPromiseAdapter from "../../src/infra/database/PgPromiseAdapter";
import StockRepositoryDatabase from "../../src/infra/repository/database/StockRepositoryDatabase";
import StockRepositoryMemory from "../../src/infra/repository/memory/StockRepositoryMemory";

test("Deve decrementar o estoque", async function () {
	// given
	// const stockRepository = new StockRepositoryMemory();
	const connection = new PgPromiseAdapter();
	const stockRepository = new StockRepositoryDatabase(connection);
	await stockRepository.clear();
	await stockRepository.save(new StockEntry(1, "in", 20));
	const decrementStock = new DecrementStock(stockRepository);
	const input = {
		idItem: 1,
		quantity: 10
	};
	// when
	await decrementStock.execute(input);
	// then?
	const getStock = new GetStock(stockRepository);
	const output = await getStock.execute(1);
	expect(output.total).toBe(10);
	await connection.close();
});
