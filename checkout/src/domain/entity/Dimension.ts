export default class Dimension {

	constructor (
		readonly width: number,
		readonly height: number,
		readonly length: number,
		readonly weight: number
	) {
		if (width <= 0 || height <= 0 || length <= 0 || weight <= 0) throw new Error("Invalid dimension");
	}

	getVolume () {
		return (this.width/100) * (this.height/100) * (this.length/100);
	}

	getDensity () {
		return this.weight/this.getVolume();
	}
}