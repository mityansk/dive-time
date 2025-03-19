const express = require('express');
const feedbackController = require('../controllers/Feedback.Controller');
const { validateFeedback } = require('../utils/Feedback.validation');

const router = express.Router();

router.post('/', validateFeedback, feedbackController.sendFeedback);

module.exports = router;
