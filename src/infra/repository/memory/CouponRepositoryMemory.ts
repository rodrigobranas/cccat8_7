import Coupon from "../../../domain/entity/Coupon";
import CouponRepository from "../../../domain/repository/CouponRepository";

export default class CouponRepositoryMemory implements CouponRepository {
	coupons: Coupon[];

	constructor () {
		this.coupons = [];
	}

	async save(coupon: Coupon): Promise<void> {
		this.coupons.push(coupon);
	}

	async getCoupon(code: string): Promise<Coupon | undefined> {
		return this.coupons.find(coupon => coupon.code === code);
	}

}