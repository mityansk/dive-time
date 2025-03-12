const { Tour } = require('../db/models')

class TourService {
	static async getAll() {
		return await Tour.findAll()
	}

	static async getById(id) {
		return await Tour.findByPk(id)
	}

	static async create(data) {
		const tour = await Tour.create(data)
		return await this.getById(tour.id)
	}

	static async update(id, data) {
		const tour = await this.getById(id)
		if (!tour) {
			return null
		}
		tour.location_name = data.location_name
		tour.description = data.description
		tour.date = data.date
		await tour.save()
		return tour
	}

	static async delete(id) {
		const tour = await this.getById(id)
		if (!tour) {
			return null
		}
		await tour.destroy()
		return tour
	}
}

module.exports = TourService
