'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiveLocation extends Model {
    static associate({ Equipment }) {
      this.hasMany(Equipment, {
        foreignKey: 'diveLocation_id',
      });
    }
  }
  DiveLocation.init(
    {
      name: DataTypes.STRING,
      coordinateX: DataTypes.STRING,
      coordinateY: DataTypes.STRING,
      description: DataTypes.STRING,
      complexity: DataTypes.STRING,
      deep: DataTypes.STRING,
      image: DataTypes.STRING,
      arrayImage: DataTypes.ARRAY(DataTypes.STRING),
    },
    {
      sequelize,
      modelName: 'DiveLocation',
    }
  );
  return DiveLocation;
};
