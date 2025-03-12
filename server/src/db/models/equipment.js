"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Equipment extends Model {
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "user_id",
        as: "owner",
      });
      // Equipment.belongsTo(Location, {
      //   foreignKey: "location_id",
      // });
    }
  }
  Equipment.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      image: DataTypes.STRING,
      isRented: DataTypes.BOOLEAN,
      user_id: DataTypes.INTEGER,
      // location_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Equipment",
    }
  );
  return Equipment;
};
