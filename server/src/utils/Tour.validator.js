class TourValidator {
	static validate(data) {
		const { location_name, description, date } = data
		if (
			!location_name ||
			typeof location_name !== 'string' ||
			location_name.trim() === ''
		) {
			return {
				isValid: false,
				error: 'Location name is required and must be a non-empty string.',
			}
		}

		if (
			!description ||
			typeof description !== 'string' ||
			description.trim() === ''
		) {
			return {
				isValid: false,
				error: 'Description is required and must be a non-empty string.',
			}
		}

		if (!date || typeof date !== 'string' || date.trim() === '') {
			return {
				isValid: false,
				error: 'Date is required and must be a non-empty string.',
			}
		}

		return {
			isValid: true,
			error: null,
		}
	}
}

module.exports = TourValidator
