const { Tour, User } = require('../db/models')


class TourService {
	static async getAll() {
		return await Tour.findAll({
			include: [
				{
					model: User,
					as: 'author',
					attributes: ['id', 'username'],
				},
			],
		})
	}

	static async getById(id) {
		return await Tour.findByPk(id, {
			include: [
				{
					model: User,
					as: 'author',
					attributes: ['id', 'username'],
				},
			],
		})
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
		tour.start_date = data.start_date
		tour.end_date = data.end_date
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
