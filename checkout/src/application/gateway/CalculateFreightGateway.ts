export default interface CalculateFreightGateway {
	calculate (orderItems: { volume: number, density: number, quantity: number }[], from?: string, to?: string): Promise<number>;
}