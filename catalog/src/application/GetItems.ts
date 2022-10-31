import ItemRepository from "../domain/repository/ItemRepository";

export default class GetItems {

	constructor (readonly itemRepository: ItemRepository) {
	}

	async execute (): Promise<Output> {
		const items = await this.itemRepository.getItems();
		console.log(new Date(), "GetItems");
		return items.map(item => ({
			idItem: item.idItem,
			description: item.description,
			price: item.price,
			volume: item.getVolume(),
			density: item.getDensity(),
			width: item.dimension?.width,
			height: item.dimension?.height,
			length: item.dimension?.length,
			weight: item.dimension?.weight
		}));
	}
}

type Output = {
	idItem: number,
	description: string,
	price: number,
	volume: number,
	density: number,
	width?: number,
	height?: number,
	length?: number,
	weight?: number
}[]