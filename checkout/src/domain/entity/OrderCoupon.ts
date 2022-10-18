export default class OrderCoupon {

	constructor (readonly code: string, readonly percentage: number) {
	}

	calculateDiscount (total: number) {
		return (total * this.percentage)/100;
	}
}
