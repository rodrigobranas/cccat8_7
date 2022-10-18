import Item from "../../domain/entity/Item";

export default interface GetItemGateway {
	getItem (idItem: number): Promise<Item>;
}