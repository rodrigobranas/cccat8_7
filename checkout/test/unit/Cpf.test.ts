import Cpf from "../../src/domain/entity/Cpf";

const validCpfs = [
	"317.153.361-86",
	"198.454.187-08",
	"147.085.437-60"
];

test.each(validCpfs)("Deve validar o cpf", function (validCpf) {
	const cpf = new Cpf(validCpf);
	expect(cpf).toBeDefined();
});

test("Deve tentar validar o cpf com mais de 14 caracteres", function () {
	expect(() => new Cpf("147.085.437-600")).toThrow(new Error("Cpf inválido"));
});

const cpfsWithSameDigit = [
	"111.111.111-11",
	"222.222.222-22",
	"333.333.333-33"
];

test.each(cpfsWithSameDigit)("Deve tentar validar um cpf com todos os dígitos iguais", function (cpf) {
	expect(() => new Cpf(cpf)).toThrow(new Error("Cpf inválido"));
});

test("Deve validar o cpf com letras", function () {
	expect(() =>  new Cpf("abc")).toThrow(new Error("Cpf inválido"));
});
