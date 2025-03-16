'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: 'user_id',
        as: 'owner',
      });
    }
  }
  Equipment.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      isRented: DataTypes.BOOLEAN,
      address: DataTypes.STRING,
      coordinates: DataTypes.ARRAY(DataTypes.FLOAT),
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Equipment',
    }
  );
  return Equipment;
};
