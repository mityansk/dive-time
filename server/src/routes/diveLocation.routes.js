const DiveLocationController = require('../controllers/DiveLocation.Controller');

const router = require('express').Router();

router.get('/', DiveLocationController.getAllDiveLocation);


module.exports = router;
