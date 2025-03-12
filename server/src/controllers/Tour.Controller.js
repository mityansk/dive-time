const TourService = require("../services/Tour.service")
const formatResponse = require("../utils/formatResponse")
const isValidId = require("../utils/isValidId")
const TourValidator = require("../utils/Tour.validator")

class TourController {
	static async getAllTour(req, res) {
		try {
			const tours = await TourService.getAll()
			if (tours.length === 0) {
				return res.status(200).json(formatResponse(200, 'No tours found', []))
			}
			res.status(200).json(formatResponse(200, 'success', tours))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async getTourById(req, res) {
		const { id } = req.params

		if (!isValidId(id)) {
			return res.status(400).json(formatResponse(400, 'Invalid tour ID'))
		}

		try {
			const tour = await TourService.getById(+id)
			if (!tour) {
				return res
					.status(404)
					.json(formatResponse(404, `Tour with id ${id} not found`))
			}
			res.status(200).json(formatResponse(200, 'success', tour))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async createTour(req, res) {
		const { location_name, description, date } = req.body
		//* const { location } = res.locals //! НЕ ЗАБЫТЬ ДОСТАТЬ ЛОКАЦИЮ
		const { isValid, error } = TourValidator.validate({
			location_name,
			description,
			date,
		})
		if (!isValid) {
			return res
				.status(400)
				.json(formatResponse(400, 'Validation error', null, error))
		}

		try {
			const newTour = await TourService.create({
				location_name,
				description,
				date,
				//! НЕ ЗАБЫТЬ ДОБАВИТЬ ID ЛОКАЦИИ location_id: location.id
			})

			if (!newTour) {
				return res
					.status(400)
					.json(formatResponse(400, 'Failed to create new tour'))
			}

			res.status(201).json(formatResponse(201, 'success', newTour))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async updateTour(req, res) {
		const { id } = req.params
		const { location_name, description, date } = req.body
		//! const { location } = res.locals НЕ ЗАБЫТЬ ДОСТАТЬ ЛОКАЦИЮ

		if (!isValidId(id)) {
			return res.status(400).json(formatResponse(400, 'Invalid task ID'))
		}

		const { isValid, error } = TourValidator.validate({
			location_name,
			description,
			date,
		})
		if (!isValid) {
			return res
				.status(400)
				.json(formatResponse(400, 'Validation error', null, error))
		}

		try {
			const existingTour = await TourService.getById(+id)

			if (!existingTour) {
				return res.status(404).json(formatResponse(404, 'Tour not found'))
			}

			//! if (existingTour.author_id !== user.id) {
			//! 	return res
			//!		.status(400)
			//! 		.json(
			//! 			formatResponse(400, "You don't have permission to update this tour")
			//! 		)
			//! } НУЖНО АВТОРСТВО ДЛЯ ОБНОВЛЕНИЯ ТУРА

			const updatedTour = await TourService.update(+id, {
				location_name,
				description,
				date,
			})
			res.status(200).json(formatResponse(200, 'success', updatedTour))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}

	static async deleteTour(req, res) {
		const { id } = req.params
		//! const { user } = res.locals ПРАВА НА УДАЛЕНИЯ ТОЛЬКО У СОЗДАТЕЛЯ?

		if (!isValidId(id)) {
			return res.status(400).json(formatResponse(400, 'Invalid tour ID'))
		}

		try {
			const existingTour = await TourService.getById(+id)

			if (!existingTour) {
				return res.status(404).json(formatResponse(404, 'Tour not found'))
			}

			//! if (existingTour.author_id !== user.id) {
			//! 	return res
			//! 		.status(400)
			//! 		.json(
			//! 			formatResponse(400, "You don't have permission to delete this tour")
			//! 		)
			//! } ПРОВЕРКА ДОСТУПА НА УДАЛЕНИЯ 

			await TourService.delete(+id)
			res.status(200).json(formatResponse(200, 'Tour successfully deleted'))
		} catch ({ message }) {
			console.error(message)
			res
				.status(500)
				.json(formatResponse(500, 'Internal server error', null, message))
		}
	}
}

module.exports = TourController