export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expireDate?: Date) {
	}

	isExpired (now: Date = new Date()) {
		return this.expireDate && this.expireDate.getTime() < now.getTime();
	}

	calculateDiscount (total: number, now: Date = new Date()) {
		if (this.isExpired(now)) return 0;
		return (total * this.percentage)/100;
	}
}
