'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
	class Tour extends Model {
		static associate({ User, DiveLocation }) {
			Tour.belongsTo(User, {
				foreignKey: 'author_id',
				as: 'author',
			})
			Tour.belongsTo(DiveLocation, {
				foreignKey: 'location_id',
				as: 'location',
			})
		}
	}
	Tour.init(
		{
			image: DataTypes.STRING,
			location_name: DataTypes.STRING,
			description: DataTypes.STRING,
			start_date: DataTypes.STRING,
			end_date: DataTypes.STRING,
			location_id: DataTypes.INTEGER,
			author_id: {
				type: DataTypes.INTEGER,
			},
		},
		{
			sequelize,
			modelName: 'Tour',
		}
	)
	return Tour
}
