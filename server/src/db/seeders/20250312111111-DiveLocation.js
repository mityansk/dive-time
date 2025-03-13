/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up(queryInterface) {
		await queryInterface.bulkInsert(
			'DiveLocations',
			[
				{
					name: 'Ущелье дьявола',
					coordinateX: 51.84168211156664,
					coordinateY: 104.76153977184012,
					description: 'Самое глубокое ущелье в мире',
					complexity: 'нереально',
					deep: '500 м',
					createdAt: new Date(),
					updatedAt: new Date(),
				},
			],
			{}
		);
	},

	async down(queryInterface) {
		await queryInterface.bulkDelete('DiveLocations', null, {});
	},
};
