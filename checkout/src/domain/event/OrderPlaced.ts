import Order from "../entity/Order";
import DomainEvent from "./DomainEvent";

export default class OrderPlaced implements DomainEvent {
	name = "orderPlaced";

	constructor (readonly order: Order) {
	}
}
