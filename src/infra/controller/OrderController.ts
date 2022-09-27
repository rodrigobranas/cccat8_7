import Checkout from "../../application/Checkout";
import GetOrderByCpf from "../../application/GetOrdersByCpf";
import Preview from "../../application/Preview";
import HttpServer from "../http/HttpServer";

export default class OrderController {

	constructor (
		readonly httpServer: HttpServer,
		readonly preview: Preview, 
		readonly checkout: Checkout,
		readonly getOrderByCpf: GetOrderByCpf
	) {
		httpServer.on("post", "/preview", async function (params: any, body: any) {
			const total = await preview.execute(body);
			return { total };
		});
		
		httpServer.on("post", "/checkout", async function (params: any, body: any) {
			await checkout.execute(body)
		});
		
		httpServer.on("get", "/orders/:cpf", async function (params: any, body: any) {
			const orders = await getOrderByCpf.execute(params.cpf);
			return orders;
		});
	}
}
