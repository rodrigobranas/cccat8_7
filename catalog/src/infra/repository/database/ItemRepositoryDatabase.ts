import Dimension from "../../../domain/entity/Dimension";
import Item from "../../../domain/entity/Item";
import ItemRepository from "../../../domain/repository/ItemRepository";
import Connection from "../../database/Connection";

export default class ItemRepositoryDatabase implements ItemRepository {

	constructor (readonly connection: Connection) {
	}

	async getItem(idItem: number): Promise<Item> {
		const [itemData] = await this.connection.query("select * from ccca.item where id_item = $1", [idItem]);
		return new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight));
	}

	async getItems(): Promise<Item[]> {
		const itemsData = await this.connection.query("select * from ccca.item", []);
		const items: Item[] = [];
		for (const itemData of itemsData) {
			items.push(new Item(itemData.id_item, itemData.description, parseFloat(itemData.price), new Dimension(itemData.width, itemData.height, itemData.length, itemData.weight)));
		}
		return items;
	}

	save(item: Item): Promise<void> {
		throw new Error("Method not implemented.");
	}

}
