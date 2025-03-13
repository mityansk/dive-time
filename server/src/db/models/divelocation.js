'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DiveLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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