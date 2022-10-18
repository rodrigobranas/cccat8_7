import HttpServer from "../http/HttpServer";
import GetItem from "../../application/GetItem";

export default class OrderController {

	constructor (
		readonly httpServer: HttpServer,
		readonly getItem: GetItem
	) {
		
		httpServer.on("get", "/items/:idItem", async function (params: any, body: any) {
			const item = await getItem.execute(params.idItem);
			return item;
		});
	}
}
