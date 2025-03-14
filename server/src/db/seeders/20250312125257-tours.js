/* eslint-disable no-unused-vars */
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
			'Tours',
			[
				{
					image: 'public/images/devilGorge (1).jpg',
					location_name: 'Ущелье дьявола',
					description:
						'Собираемся поехать на Папуа-Новая Гвинея и оттуда поплывем к марианской впадине будет весело и захватывающе. Поехали с нами!',
					start_date: '22.02.2001',
					end_date: '29.02.2001',
					location_id: 1,
					author_id: 3,
				},
			],
			{}
		)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tours", null, {});
  },
};
