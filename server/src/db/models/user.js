"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({ Equipment, Tour }) {
      this.hasMany(Equipment, { foreignKey: "user_id", as: "equipment" });
      this.hasMany(Tour, {
				foreignKey: 'author_id',
				as: 'tour',
			})
    }
  }
  User.init(
		{
			username: DataTypes.STRING,
			email: DataTypes.STRING,
			password: DataTypes.STRING,
			isEmailConfirmed: DataTypes.BOOLEAN,
			resetToken: DataTypes.STRING,
			resetTokenExpiry: DataTypes.DATE,
		},
		{
			sequelize,
			modelName: 'User',
		}
	);
  return User;
};
