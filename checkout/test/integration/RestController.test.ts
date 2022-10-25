import axios from "axios";

test("Deve testar o preview pela API", async function () {
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		]
	};
	const response = await axios.post("http://localhost:3000/preview", input);
	const preview = response.data;
	expect(preview.total).toBe(6350);
});

test("Deve testar o preview com desconto pela API", async function () {
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		coupon: "VALE20"
	};
	const response = await axios.post("http://localhost:3000/preview", input);
	const preview = response.data;
	expect(preview.total).toBe(5132);
});
