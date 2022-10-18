export default class FreightCalculator {
	static MIN_FREIGHT = 10;
	static DEFAULT_DISTANCE = 1000;

	static calculate (volume: number, density: number, distance: number = this.DEFAULT_DISTANCE) {
		const freight = volume * distance * (density/100);
		if (freight > 0 && freight < this.MIN_FREIGHT) return this.MIN_FREIGHT;
		return freight;
	}
}