import Dimension from "./Dimension";

export default class Item {
	
	constructor (
		readonly idItem: number, 
		readonly description: string, 
		readonly price: number,
		readonly dimension?: Dimension
	) {
	}

	getVolume () {
		if (!this.dimension) return 0;
		return this.dimension.getVolume();
	}

	getDensity () {
		if (!this.dimension) return 0;
		return this.dimension.getDensity();
	}
}
