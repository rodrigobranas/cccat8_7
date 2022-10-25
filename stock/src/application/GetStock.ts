import StockCalculator from "../domain/entity/StockCalculator";
import StockRepository from "../domain/repository/StockRepository";

export default class GetStock {
	
	constructor (readonly stockRepository: StockRepository) {
	}

	async execute (idItem: number): Promise<Output> {
		const stockEntries = await this.stockRepository.getStockEntries(idItem);
		const total = StockCalculator.calculate(stockEntries);
		return {
			total
		};
	}
}

type Output = {
	total: number
}
