import axios from "axios";

test("Deve testar o getItem pela API", async function () {
	const response = await axios.get("http://localhost:3002/items/1");
	const item = response.data;
	expect(item.price).toBe(1000);
});