import Checkout from "./application/Checkout";
import GetOrdersByCpf from "./application/GetOrdersByCpf";
import Preview from "./application/Preview";
import SimulateFreight from "./application/SimulateFreight";
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
import ZipcodeRepositoryDatabase from "./infra/repository/database/ZipcodeRepositoryDatabase";
import ItemRepositoryMemory from "./infra/repository/memory/ItemRepositoryMemory";
import OrderRepositoryMemory from "./infra/repository/memory/OrderRepositoryMemory";
import CalculateFreightGateway from "./application/gateway/CalculateFreightGateway";
import CalculateFreightHttpGateway from "./infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "./infra/gateway/GetItemHttpGateway";

const connection = new PgPromiseAdapter();
// const itemRepository = new ItemRepositoryMemory();
// itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)));
// itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)));
// itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)));
const itemRepository = new ItemRepositoryDatabase(connection);
const orderRepository = new OrderRepositoryMemory();
const couponRepository = new CouponRepositoryMemory();
const repositoryFactory = new MemoryRepositoryFactory();
couponRepository.save(new Coupon("VALE20", 20));
const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
// const calculateFreightGateway: CalculateFreightGateway = {
// 	async calculate (orderItems: { volume: number; density: number; quantity: number; }[], from?: string | undefined, to?: string | undefined): Promise<number> {
// 		return 260;
// 	}
// }
const getItemGateway = new GetItemHttpGateway();
const calculateFreightGateway = new CalculateFreightHttpGateway();
const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway);
const checkout = new Checkout(repositoryFactory);
const getOrdersByCpf = new GetOrdersByCpf(orderRepository);
const simulateFreight = new SimulateFreight(itemRepository, zipcodeRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttp();
new RestController(httpServer, preview, checkout, getOrdersByCpf, simulateFreight);
httpServer.listen(3000);
