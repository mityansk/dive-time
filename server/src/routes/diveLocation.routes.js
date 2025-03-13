const DiveLocationController = require('../controllers/DiveLocation.Controller');

const router = require('express').Router();

router.get('/', DiveLocationController.getAllDiveLocation);
router.get('/:id', DiveLocationController.getDiveLocationById);


module.exports = router;
