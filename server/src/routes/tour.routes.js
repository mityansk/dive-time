const router = require("express").Router();

router.get('/', TourController.getAllTour)
router.get('/:id', TourController.getTourById)
router.post('/', TourController.createTour)
router.put('/:id', TourController.UpdateTour)
router.delete('/:id', TourController.deleteTour)

module.exports = router