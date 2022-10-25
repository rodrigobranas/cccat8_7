import NotifyCustomer from "../../application/NotifyCustomer";
import Queue from "../queue/Queue";

export default class QueueController {

	constructor (
		readonly queue: Queue,
		readonly notifyCustomer: NotifyCustomer
	) {
		queue.on("orderPlaced", "orderPlaced.notifyCustomer", async function (msg: any) {
			await notifyCustomer.execute();
		});
	}
}
