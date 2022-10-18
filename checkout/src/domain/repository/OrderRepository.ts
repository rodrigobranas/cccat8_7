import Order from "../entity/Order";

export default interface OrderRepository {
	save (order: Order): Promise<void>;
	getByCpf (cpf: string): Promise<Order[]>;
	count (): Promise<number>;
	clear (): Promise<void>;
}
