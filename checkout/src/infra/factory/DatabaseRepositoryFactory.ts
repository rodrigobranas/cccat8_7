import RepositoryFactory from "../../domain/factory/RepositoryFactory";
import CouponRepository from "../../domain/repository/CouponRepository";
import ItemRepository from "../../domain/repository/ItemRepository";
import OrderRepository from "../../domain/repository/OrderRepository";
import Connection from "../database/Connection";
import CouponRepositoryDatabase from "../repository/database/CouponRepositoryDatabase";
import ItemRepositoryDatabase from "../repository/database/ItemRepositoryDatabase";
import OrderRepositoryDatabase from "../repository/database/OrderRepositoryDatabase";

export default class DatabaseRepositoryFactory implements RepositoryFactory {

	constructor (readonly connection: Connection) {
	}

	createItemRepository(): ItemRepository {
		return new ItemRepositoryDatabase(this.connection);
	}

	createCouponRepository(): CouponRepository {
		return new CouponRepositoryDatabase(this.connection);
	}

	createOrderRepository(): OrderRepository {
		return new OrderRepositoryDatabase(this.connection);
	}

}