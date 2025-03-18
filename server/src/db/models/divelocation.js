'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiveLocation extends Model {
    static associate({ Tour }) {
      this.hasMany(Tour, {
        foreignKey: 'location_id',
        as: 'location',
      });
    }
  }
  DiveLocation.init(
		{
			name: DataTypes.STRING,
			coordinateX: DataTypes.STRING,
			coordinateY: DataTypes.STRING,
			description: DataTypes.TEXT,
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
