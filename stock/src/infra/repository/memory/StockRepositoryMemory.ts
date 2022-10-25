import StockEntry from "../../../domain/entity/StockEntry";
import StockRepository from "../../../domain/repository/StockRepository";

export default class StockRepositoryMemory implements StockRepository {
	stockEntries: StockEntry[];

	constructor () {
		this.stockEntries = [];
	}
	
	async getStockEntries(idItem: number): Promise<StockEntry[]> {
		return this.stockEntries.filter(stockEntry => stockEntry.idItem === idItem);
	}
	
	async save(stockEntry: StockEntry): Promise<void> {
		this.stockEntries.push(stockEntry);
	}
	
	async clear(): Promise<void> {
		this.stockEntries = [];
	}
}
