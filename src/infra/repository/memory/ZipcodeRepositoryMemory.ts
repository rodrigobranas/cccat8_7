import Zipcode from "../../../domain/entity/Zipcode";
import ZipcodeRepository from "../../../domain/repository/ZipcodeRepository";

export default class ZipcodeRepositoryMemory implements ZipcodeRepository {
	zipcodes: Zipcode[];

	constructor () {
		this.zipcodes = [];
	}

	async save(zipcode: Zipcode): Promise<void> {
		this.zipcodes.push(zipcode);
	}

	async getByCode(code: string): Promise<Zipcode> {
		const zipcode = this.zipcodes.find(zipcode => zipcode.code === code);
		if (!zipcode) throw new Error("Zipcode not found");
		return zipcode;
	}

}