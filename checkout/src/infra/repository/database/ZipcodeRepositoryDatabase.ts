import Coord from "../../../domain/entity/Coord";
import Zipcode from "../../../domain/entity/Zipcode";
import ZipcodeRepository from "../../../domain/repository/ZipcodeRepository";
import Connection from "../../database/Connection";

export default class ZipcodeRepositoryDatabase implements ZipcodeRepository {

	constructor (readonly connection: Connection) {
	}

	save(zipcode: Zipcode): Promise<void> {
		throw new Error("Method not implemented.");
	}

	async getByCode(code: string): Promise<Zipcode> {
		const [zipcodeData] = await this.connection.query("select * from ccca.zipcode where code = $1", [code]);
		if (!zipcodeData) throw new Error("Zipcode not found");
		const zipcode = new Zipcode(zipcodeData.code, zipcodeData.street, zipcodeData.neighborhood, new Coord(parseFloat(zipcodeData.lat), parseFloat(zipcodeData.long)));
		return zipcode;
	}

}