const DiveLocationService = require('../services/DiveLocation.service');

class DiveLocationController {
	static async getAllDiveLocation(req, res) {
		try {
			const diveLocations = await DiveLocationService.getAll();
			res.status(200).json(diveLocations);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
}
module.exports = DiveLocationController;
