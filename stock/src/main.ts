import ClearStock from "./application/ClearStock";
import DecrementStock from "./application/DecrementStock";
import GetStock from "./application/GetStock";
import QueueController from "./infra/controller/QueueController";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import StockRepositoryDatabase from "./infra/repository/database/StockRepositoryDatabase";

async function init () {
	const connection = new PgPromiseAdapter();
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiHttp();
	const stockRepository = new StockRepositoryDatabase(connection);
	const decrementStock = new DecrementStock(stockRepository);
	const getStock = new GetStock(stockRepository);
	const clearStock = new ClearStock(stockRepository);
	new RestController(httpServer, decrementStock, getStock, clearStock);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, decrementStock);
	httpServer.listen(3003);
}

init();
