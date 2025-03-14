class TourValidator {
	static validate(data) {
		const { location_name, description, start_date, end_date } = data
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

		if (
			!start_date ||
			typeof start_date !== 'string' ||
			start_date.trim() === ''
		) {
			return {
				isValid: false,
				error: 'Date is required and must be a non-empty string.',
			}
		}

		if (!end_date || typeof end_date !== 'string' || end_date.trim() === '') {
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
