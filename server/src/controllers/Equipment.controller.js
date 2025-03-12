const EquipmentService = require("../services/Equipment.service");
const formatResponse = require("../utils/formatResponse");
const isValidId = require("../utils/isValidId");
const EquipmentValidator = require("../utils/Equipment.validator");

class EquipmentController {
  static async getAll(req, res) {
    try {
      const equipments = await EquipmentService.getAll();
      if (equipments.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No equipment found", []));
      }
      res.status(200).json(formatResponse(200, "success", equipments));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async getById(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid equipment ID"));
    }
    try {
      const equipment = await EquipmentService.getById(+id);
      if (!equipment) {
        return res
          .status(404)
          .json(
            formatResponse(
              404,
              `Equipment with id ${id} not found`,
              null,
              `Equipment with id ${id} not found`
            )
          );
      }
      res.status(200).json(formatResponse(200, "success", equipment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async create(req, res) {
    const { name, price, description, image, isRented, diveLocation_id } =
      req.body;
    const { user } = res.locals;
    const { isValid, error } = EquipmentValidator.validate({
      name,
      price,
      description,
      image,
      isRented,
      diveLocation_id,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const newEquipment = await EquipmentService.create({
        name,
        price,
        description,
        image,
        isRented,
        diveLocation_id,
        user_id: user.id,
      });
      if (!newEquipment) {
        return res
          .status(400)
          .json(formatResponse(400, "Failed to create new equipment"));
      }

      res
        .status(201)
        .json(formatResponse(201, "Equipment created", newEquipment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async update(req, res) {
    const { id } = req.params;
    const { name, price, description, image, isRented, diveLocation_id } =
      req.body;

    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid equipment ID"));
    }

    const { isValid, error } = EquipmentValidator.validate({
      name,
      price,
      description,
      image,
      isRented,
      user_id: user.id,
      diveLocation_id,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const existingEquipment = await EquipmentService.getById(+id);

      if (!existingEquipment) {
        return res.status(404).json(formatResponse(404, "Equipment not found"));
      }

      if (existingEquipment.user_id !== user.id) {
        return res
          .status(403)
          .json(
            formatResponse(
              403,
              "You don't have permission to update this equipment"
            )
          );
      }

      const updatedEquipment = await EquipmentService.update(+id, {
        name,
        price,
        description,
        image,
        isRented,
        diveLocation_id,
      });
      res.status(200).json(formatResponse(200, "Success", updatedEquipment));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
  static async deleteEquipment(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid equipment ID"));
    }

    try {
      const existingEquipment = await EquipmentService.getById(+id);

      if (!existingEquipment) {
        return res.status(404).json(formatResponse(404, "Equipment not found"));
      }

      if (existingEquipment.user_id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "You don't have permission to delete this equipment"
            )
          );
      }

      await EquipmentService.delete(+id);
      res
        .status(200)
        .json(formatResponse(200, "Equipment successfully deleted"));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = EquipmentController;
