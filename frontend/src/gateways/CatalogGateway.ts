import Item from "../entities/Item";

export default interface CatalogGateway {
	getItems (): Promise<Item[]>;
}
