import amqp from "amqplib";

async function init () {
	const connection = await amqp.connect("amqp://localhost");
	const channel = await connection.createChannel();
	await channel.assertExchange("checkout", "direct", { durable: true });
	await channel.assertQueue("checkout.a", { durable: true });
	await channel.assertQueue("checkout.b", { durable: true });
	await channel.assertQueue("checkout.c", { durable: true });
	await channel.bindQueue("checkout.a", "checkout", "");
	await channel.bindQueue("checkout.b", "checkout", "");
	await channel.bindQueue("checkout.c", "checkout", "");
	const event = { orderItems: [{ idItem: 1, quantity: 1 }] };
	await channel.consume("checkout.a", function (msg: any) {
		console.log("a", msg.content.toString());
		channel.ack(msg);
	});
	await channel.consume("checkout.b", function (msg: any) {
		console.log("b", msg.content.toString());
		channel.ack(msg);
	});
	await channel.consume("checkout.c", function (msg: any) {
		console.log("c", msg.content.toString());
		channel.ack(msg);
	});
	channel.publish("checkout", "", Buffer.from(JSON.stringify(event)));
	setTimeout(function () {
		connection.close();
	}, 500);
}

init();
