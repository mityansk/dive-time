'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('DiveLocations', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER,
			},
			name: {
				type: Sequelize.STRING,
			},
			coordinateX: {
				type: Sequelize.STRING,
			},
			coordinateY: {
				type: Sequelize.STRING,
			},
			description: {
				type: Sequelize.STRING,
			},
			complexity: {
				type: Sequelize.STRING,
			},
			deep: {
				type: Sequelize.STRING,
			},
			image: {
				type: Sequelize.STRING,
			},
			arrayImage: {
				type: Sequelize.ARRAY(Sequelize.STRING),
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
			},
		});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('DiveLocations');
  }
};