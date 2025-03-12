"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Tours",
      [
        {
          location_name: "Марианская впадина",
          description:
            "Собираемся поехать на Папуа-Новая Гвинея и оттуда поплывем к марианской впадине будет весело и захватывающе. Поехали с нами!",
          date: "21.05-21-06",
          location_id: null,
          author_id: 1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          location_name: "Бермудский треугольник",
          description:
            "Собираемся поехать на острова Бермуды и оттуда поплывем к месту крушения самолетов и кораблей будет весело и захватывающе. Поехали с нами!",
          date: "26.04-11-05",
          location_id: null,
          author_id: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Tours", null, {});
  },
};
