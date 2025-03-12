const router = require("express").Router();
const EquipmentController = require("../controllers/Equipment.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router

  .get("/", EquipmentController.getAll)

  .get("/:id", EquipmentController.getById)

  .post("/", verifyAccessToken, EquipmentController.create)

  .put("/:id", verifyAccessToken, EquipmentController.update)

  .delete("/:id", verifyAccessToken, EquipmentController.deleteEquipment);

module.exports = router;
