import DecrementStock from "../../application/DecrementStock";
import Queue from "../queue/Queue";

export default class QueueController {

	constructor (
		readonly queue: Queue,
		readonly decrementStock: DecrementStock
	) {
		queue.on("orderPlaced", "orderPlaced.decrementStock", async function (msg: any) {
			await decrementStock.execute(msg);
		});
	}
}
