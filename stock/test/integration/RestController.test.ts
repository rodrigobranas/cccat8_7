import axios from "axios";

test("Deve decrementar o estoque", async function () {
	await axios.post("http://localhost:3003/clearStock");
	const input = {
		idItem: 1,
		quantity: 10
	}
	await axios.post("http://localhost:3003/decrementStock", input);
	const response = await axios.post("http://localhost:3003/getStock/1");
	const output = response.data;
	expect(output.total).toBe(-10);
});