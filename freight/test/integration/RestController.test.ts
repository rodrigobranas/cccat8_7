import axios from "axios";

test("Deve testar o simulateFreight pela API", async function () {
	const input = {
		orderItems: [
			{ volume: 0.03, density: 100, quantity: 1 }
		]
	};
	const response = await axios.post("http://localhost:3001/calculateFreight", input);
	const freight = response.data;
	expect(freight).toBe(30);
});