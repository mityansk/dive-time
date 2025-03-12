const { DiveLocation } = require('../db/models');

class DiveLocationService {
	//* Получение всех локаций
	static async getAll() {
		return await DiveLocation.findAll();
	}
}

module.exports = DiveLocationService;