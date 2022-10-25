import NotifyCustomer from "./application/NotifyCustomer";
import QueueController from "./infra/controller/QueueController";
import RabbitMQAdapter from "./infra/queue/RabbitMQAdapter";

async function init () {
	const notifyCustomer = new NotifyCustomer();
	const queue = new RabbitMQAdapter();
	await queue.connect();
	new QueueController(queue, notifyCustomer);
}

init();
