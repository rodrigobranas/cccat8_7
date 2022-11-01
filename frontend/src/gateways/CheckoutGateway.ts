export default interface CheckoutGateway {
	preview (order: any): Promise<any>;
	checkout (order: any): Promise<any>;
	validateCoupon (code: string): Promise<boolean>;
	getOrdersByCpf (cpf: string): Promise<any>;
}
