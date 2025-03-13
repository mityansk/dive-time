'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    static associate({User}) {
      Tour.belongsTo(User, {
				foreignKey: 'author_id',
        as: 'author'
			})
    }
  }
  Tour.init({
    location_name: DataTypes.STRING,
    description: DataTypes.STRING,
    date: DataTypes.STRING,
    location_id: DataTypes.INTEGER,
    author_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};