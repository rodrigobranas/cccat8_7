import ValidateCoupon from "../../src/application/usecase/ValidateCoupon";
import Coupon from "../../src/domain/entity/Coupon";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";

test("Deve validar um cupom de desconto", async function () {
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20, new Date("2022-03-10T10:00:00")));
	const validateCoupon = new ValidateCoupon(couponRepository);
	const input = {
		date: new Date("2021-03-01T10:00:00"),
		code: "VALE20"
	}
	const isValid = await validateCoupon.execute(input);
	expect(isValid).toBeTruthy();
});
