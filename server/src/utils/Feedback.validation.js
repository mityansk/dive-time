const { body, validationResult } = require('express-validator');

const validateFeedback = [
	body('name').notEmpty().withMessage('Имя обязательно'),
	body('email').isEmail().withMessage('Некорректный email'),
	body('description').notEmpty().withMessage('Описание обязательно'),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = {
	validateFeedback,
};
