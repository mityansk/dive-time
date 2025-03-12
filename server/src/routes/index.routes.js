const router = require('express').Router();
const authRoutes = require('./auth.routes');
const tourRoutes = require('./tour.routes')
const formatResponse = require('../utils/formatResponse');

router.use('/auth', authRoutes);
router.use('/tour', tourRoutes);

router.use('*', (req, res) => {
  res.status(404).json(formatResponse(404, 'Not Found!'));
});

module.exports = router;
