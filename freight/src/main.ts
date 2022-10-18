import CalculateFreight from "./application/CalculateFreight";
import RestController from "./infra/controller/RestController";
import PgPromiseAdapter from "./infra/database/PgPromiseAdapter";
import ExpressAdapter from "./infra/http/ExpressAdapter";
import ZipcodeRepositoryDatabase from "./infra/repository/database/ZipcodeRepositoryDatabase";

const connection = new PgPromiseAdapter();
const zipcodeRepository = new ZipcodeRepositoryDatabase(connection);
const simulateFreight = new CalculateFreight(zipcodeRepository);
const httpServer = new ExpressAdapter();
// const httpServer = new HapiHttp();
new RestController(httpServer, simulateFreight);
httpServer.listen(3001);