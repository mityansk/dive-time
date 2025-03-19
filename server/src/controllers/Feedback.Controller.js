const feedbackService = require('../services/Feedback.Service');

const sendFeedback = async (req, res) => {
	try {
		const { name, email, description } = req.body;
    console.log(name, email, description);
		await feedbackService.sendEmail(name, email, description);
		res.status(200).send('Email sent successfully');
	} catch (error) {
		res.status(500).send(error.message);
	}
};

module.exports = {
	sendFeedback,
};
