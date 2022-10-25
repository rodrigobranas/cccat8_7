import Checkout from "../../application/usecase/Checkout";
import Queue from "../queue/Queue";

export default class QueueController {
	// handler
	constructor (readonly queue: Queue, readonly checkout: Checkout) {
		queue.on("placeOrder", "placeOrder.checkout", async function (msg: any) {
			await checkout.execute(msg);
		});
	}
}