import StockRepository from "../domain/repository/StockRepository";

export default class ClearStock {
	
	constructor (readonly stockRepository: StockRepository) {
	}

	async execute (): Promise<void> {
		await this.stockRepository.clear();
		
	}
}
