import CouponRepository from "../../domain/repository/CouponRepository";

export default class ValidateCoupon {

	constructor (readonly couponRepository: CouponRepository) {
	}

	async execute (input: Input): Promise<boolean> {
		const coupon = await this.couponRepository.getCoupon(input.code);
		if (!coupon) return false;
		return !coupon.isExpired(input.date);
	}
}

type Input = {
	date: Date,
	code: string
}