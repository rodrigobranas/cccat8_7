import CalculateFreightGateway from "../../src/application/gateway/CalculateFreightGateway";
import Preview from "../../src/application/usecase/Preview";
import Coupon from "../../src/domain/entity/Coupon";
import Dimension from "../../src/domain/entity/Dimension";
import Item from "../../src/domain/entity/Item";
import ItemRepository from "../../src/domain/repository/ItemRepository";
import CalculateFreightHttpGateway from "../../src/infra/gateway/CalculateFreightHttpGateway";
import GetItemHttpGateway from "../../src/infra/gateway/GetItemHttpGateway";
import CouponRepositoryMemory from "../../src/infra/repository/memory/CouponRepositoryMemory";
import ItemRepositoryMemory from "../../src/infra/repository/memory/ItemRepositoryMemory";

let preview: Preview;

beforeEach(function () {
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20));
	const calculateFreightGateway: CalculateFreightGateway = {
		async calculate (orderItems: { volume: number; density: number; quantity: number; }[], from?: string | undefined, to?: string | undefined): Promise<number> {
			return 202.091008941878;
		}
	}
	const getItemGateway = new GetItemHttpGateway();
	preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway);
});

test("Deve simular um pedido", async function () {
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		from: "88015600",
		to: "22060030"
	};
	const total = await preview.execute(input);
	expect(total).toBe(6292.091008941878);
});

test("Deve simular um pedido com desconto", async function () {
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		coupon: "VALE20",
		from: "88015600",
		to: "22060030"
	};
	const total = await preview.execute(input);
	expect(total).toBe(5074.091008941878);
});

test("Deve simular um pedido com distância", async function () {
	const itemRepository = new ItemRepositoryMemory();
	itemRepository.save(new Item(1, "Guitarra", 1000, new Dimension(100, 30, 10, 3)));
	itemRepository.save(new Item(2, "Amplificador", 5000, new Dimension(50, 50, 50, 20)));
	itemRepository.save(new Item(3, "Cabo", 30, new Dimension(10, 10, 10, 0.9)));
	const couponRepository = new CouponRepositoryMemory();
	couponRepository.save(new Coupon("VALE20", 20));
	const calculateFreightGateway: CalculateFreightGateway = {
		async calculate (orderItems: { volume: number; density: number; quantity: number; }[], from?: string | undefined, to?: string | undefined): Promise<number> {
			return 202.091008941878;
		}
	}
	// const calculateFreightGateway = new CalculateFreightHttpGateway();
	const getItemGateway = new GetItemHttpGateway();
	const preview = new Preview(couponRepository, getItemGateway, calculateFreightGateway);
	const input = {
		cpf: "317.153.361-86",
		orderItems: [
			{ idItem: 1, quantity: 1 },
			{ idItem: 2, quantity: 1 },
			{ idItem: 3, quantity: 3 }
		],
		from: "88015600",
		to: "22060030"
	};
	const total = await preview.execute(input);
	expect(total).toBe(6292.091008941878);
});
