import axios from "axios";
import CalculateFreightGateway from "../../application/gateway/CalculateFreightGateway";

export default class CalculateFreightHttpGateway implements CalculateFreightGateway {

	async calculate(orderItems: { volume: number; density: number; quantity: number; }[], from?: string | undefined, to?: string | undefined): Promise<number> {
		const response = await axios.post("http://localhost:3001/calculateFreight", { orderItems, from, to });
		const freight = response.data;
		return freight;
	}

}