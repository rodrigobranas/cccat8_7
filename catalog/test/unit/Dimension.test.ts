import Dimension from "../../src/domain/entity/Dimension";

test("Deve calcular o volume", function () {
	const dimension = new Dimension(100, 30, 10, 3);
	expect(dimension.getVolume()).toBe(0.03);
});

test("Não deve criar dimensão inválida", function () {
	expect(() => new Dimension(-100, -30, -10, -3)).toThrow("Invalid dimension");
});
