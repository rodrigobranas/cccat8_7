import Checkout from "./application/usecase/Checkout";
import GetOrdersByCpf from "./application/usecase/GetOrdersByCpf";
import Preview from "./application/usecase/Preview";
import Coupon from "./domain/entity/Coupon";
import Dimension from "./domain/entity/Dimension";
import Item from "./domain/entity/Item";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import MemoryRepositoryFactory from "./infra/factory/MemoryRepositoryFactory";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import HapiHttp from "./infra/http/HapiAdapters";
import CouponRepositoryMemory from "./infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase";
import ItemRepositoryMemory from "./infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory";
import CalculateFreightGateway from "./application/gateway/CalculateFreightGateway";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";
import DatabaseRepositoryFactory from "./infra/factory/DatabaseRepositoryFactory";
import DecrementStockHttpGateway from "./infra/gateway/DecrementStockHttpGateway";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";
import QueueController from "./infra/controller/QueueController";
import ValidateCoupon from "./application/usecase/ValidateCoupon";
import GetOrdersByCpfQuery from "./application/query/GetOrdersByCpfQuery";

async function init () {
	const connection = new PgPromiseAdapter();
	const repositoryFactory = new DatabaseRepositoryFactory(connection);
	const getItemGateway = new GetItemHttpGateway();
	const calculateFreightGateway = new CalculateFreightHttpGateway();
	const decrementStockGateway = new DecrementStockHttpGateway();
	const preview = new Preview(repositoryFactory.createCouponRepository(), getItemGateway, calculateFreightGateway);
	const queue = new RabbitMQAdapter();
	await queue.connect();
	const checkout = new Checkout(repositoryFactory, getItemGateway, calculateFreightGateway, decrementStockGateway, queue);
	const getOrdersByCpf = new GetOrdersByCpf(repositoryFactory.createOrderRepository(), getItemGateway);
	const getOrdersByCpfQuery = new GetOrdersByCpfQuery(connection);
	const validateCoupon = new ValidateCoupon(repositoryFactory.createCouponRepository());
	const httpServer = new ExpressAdapter();
	// const httpServer = new HapiHttp();
	new RestController(httpServer, preview, checkout, getOrdersByCpf, validateCoupon, getOrdersByCpfQuery, queue);
	new QueueController(queue, checkout);
	httpServer.listen(3000);
}

init();
