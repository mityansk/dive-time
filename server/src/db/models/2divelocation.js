"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DiveLocation extends Model {
    static associate({ Equipment }) {
      this.hasMany(Equipment, {
        foreignKey: "diveLocation_id",
      });
    }
  }
  DiveLocation.init(
    {
      name: DataTypes.STRING,
      coordinateX: DataTypes.FLOAT,
      coordinateY: DataTypes.FLOAT,
      description: DataTypes.STRING,
      complexity: DataTypes.STRING,
      deep: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DiveLocation",
    }
  );
  return DiveLocation;
};
