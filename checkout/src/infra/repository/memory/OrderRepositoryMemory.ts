import Order from "../../../domain/entity/Order";
import OrderRepository from "../../../domain/repository/OrderRepository";

export default class OrderRepositoryMemory implements OrderRepository {
	orders: Order[];

	constructor () {
		this.orders = [];
	}
	
	async getByCpf(cpf: string): Promise<Order[]> {
		return this.orders.filter(order => order.cpf.value === cpf);
	}
	
	async save(order: Order): Promise<void> {
		this.orders.push(order);
	}
	
	async count(): Promise<number> {
		return this.orders.length;
	}

	async clear(): Promise<void> {
		this.orders = [];
	}
}