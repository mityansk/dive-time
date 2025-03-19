const { Equipment } = require('../db/models');

class EquipmentService {
  static async getById(id) {
    return await Equipment.findByPk(id);
  }

  static async getAll() {
    return await Equipment.findAll();
  }

  static async getAllByUser(userId) {
    if (userId) {
      return await Equipment.findAll({ where: { user_id: userId } });
    }
    throw new Error('UserId is required');
  }

  static async create(data) {
    const equipment = await Equipment.create(data);
    return await this.getById(equipment.id);
  }

  static async update(id, data) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error('Equipment not found');
    }
    return await equipment.update(data);
  }

  static async delete(id) {
    const equipment = await Equipment.findByPk(id);
    if (!equipment) {
      throw new Error('Equipment not found');
    }
    return await equipment.destroy();
  }
}

module.exports = EquipmentService;
