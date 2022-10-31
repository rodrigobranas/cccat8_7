import HttpServer from "../http/HttpServer";
import GetItem from "../../application/GetItem";
import GetItems from "../../application/GetItems";

export default class OrderController {

	constructor (
		readonly httpServer: HttpServer,
		readonly getItem: GetItem,
		readonly getItems: GetItems
	) {
		
		httpServer.on("get", "/items/:idItem", async function (params: any, body: any) {
			const item = await getItem.execute(params.idItem);
			return item;
		});

		httpServer.on("get", "/items", async function (params: any, body: any) {
			const items = await getItems.execute();
			return items;
		});
	}
}
