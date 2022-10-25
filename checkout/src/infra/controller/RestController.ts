import Checkout from "../../application/usecase/Checkout";
import GetOrdersByCpf from "../../application/usecase/GetOrdersByCpf";
import Preview from "../../application/usecase/Preview";
import HttpServer from "../http/HttpServer";
import Queue from "../queue/Queue";

export default class OrderController {

	constructor (
		readonly httpServer: HttpServer,
		readonly preview: Preview, 
		readonly checkout: Checkout,
		readonly getOrdersByCpf: GetOrdersByCpf,
		readonly queue: Queue
	) {
		httpServer.on("post", "/preview", async function (params: any, body: any) {
			const total = await preview.execute(body);
			return { total };
		});
		// command
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			// await checkout.execute(body);
			await queue.publish("placeOrder", body);
		});
		
		httpServer.on("get", "/orders/:cpf", async function (params: any, body: any) {
			const orders = await getOrdersByCpf.execute(params.cpf);
			return orders;
		});
	}
}
