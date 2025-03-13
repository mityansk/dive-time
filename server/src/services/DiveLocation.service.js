const { DiveLocation } = require('../db/models');

class DiveLocationService {
	//* Получение всех локаций
	static async getAll() {
		return await DiveLocation.findAll();
	}
	static async getById(id) {
		return await DiveLocation.findByPk(id);
	}
}

module.exports = DiveLocationService;