const router = require('express').Router();
const EquipmentController = require('../controllers/Equipment.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken');

router.get('/', verifyAccessToken, EquipmentController.getAll);

router.get('/:id', EquipmentController.getById);

router.post('/', verifyAccessToken, EquipmentController.create);

router.put('/:id', verifyAccessToken, EquipmentController.update);

router.delete('/:id', verifyAccessToken, EquipmentController.deleteEquipment);

module.exports = router;
