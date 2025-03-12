'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate(models) {
    }
  }
  Tour.init({
    location_name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    location_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};