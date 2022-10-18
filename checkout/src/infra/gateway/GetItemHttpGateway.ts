import axios from "axios";
import GetItemGateway from "../../application/gateway/GetItemGateway";
import Dimension from "../../domain/entity/Dimension";
import Item from "../../domain/entity/Item";

export default class GetItemHttpGateway implements GetItemGateway {

	async getItem(idItem: number): Promise<Item> {
		const response = await axios.get(`http://localhost:3002/items/${idItem}`);
		const itemData = response.data;
		return new Item(itemData.idItem, itemData.description, itemData.price, new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
	}

}