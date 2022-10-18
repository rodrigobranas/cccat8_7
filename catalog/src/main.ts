import GetItem from "./application/GetItem";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ItemRepositoryDatabase from "./infra/repository/database/ItemRepositoryDatabase";

const connection = new PgPromiseAdapter();
const itemRepository = new ItemRepositoryDatabase(connection);
const getItem = new GetItem(itemRepository);
const httpServer = new ExpressAdapter();
new RestController(httpServer, getItem);
httpServer.listen(3002);
