const DiveLocationService = require('../services/DiveLocation.service');
const formatResponse = require('../utils/formatResponse');
const isValidId = require('../utils/isValidId');

class DiveLocationController {
	static async getAllDiveLocation(req, res) {
		try {
			const diveLocations = await DiveLocationService.getAll();
			res.status(200).json(diveLocations);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	}
	
	static async getDiveLocationById(req, res) {
		const { id } = req.params;

		if (!isValidId(id)) {
			return res.status(400).json({ error: 'Invalid dive location ID' });
		}
		try {
			const diveLocation = await DiveLocationService.getById(+id);
			if (!diveLocation) {
				return res
					.status(404)
					.json(formatResponse(404, `Dive location with id ${id} not found`));
			}
			res.status(200).json(formatResponse(200, 'success', diveLocation));
		} catch ({ message }) {
			console.error(message);
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message));
		}
	}
}
module.exports = DiveLocationController;
