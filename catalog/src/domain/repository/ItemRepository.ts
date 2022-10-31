import Item from "../entity/Item";

export default interface ItemRepository {
	getItem (idItem: number): Promise<Item>;
	getItems (): Promise<Item[]>;
	save (item: Item): Promise<void>;
}