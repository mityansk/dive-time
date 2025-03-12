const router = require("express").Router();
const TourController = require("../controllers/Tour.Controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.get('/', TourController.getAllTour)
router.get('/:id', TourController.getTourById)
router.post('/', verifyAccessToken, TourController.createTour)
router.put('/:id', verifyAccessToken, TourController.UpdateTour)
router.delete('/:id', verifyAccessToken, TourController.deleteTour)

module.exports = router