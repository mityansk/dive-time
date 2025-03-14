'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Equipment', [
      {
        name: 'Акваланг',
        price: 20.0,
        description: 'Высококачественный акваланг для подводного плавания.',
        image: 'https://dlia-sporta.ru/wp-content/uploads/2019/04/Akval-0.jpg',
        isRented: false,
        user_id: 1,
        diveLocation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Маска для дайвинга',
        price: 10.0,
        description: 'Удобная маска с широким обзором для подводного плавания.',
        image:
          'https://divingwolf.ru/upload/iblock/992/9921a41ea0a9c42c40eb39565fc11ccd.jpg',
        isRented: true,
        user_id: 1,
        diveLocation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гидрокостюм',
        price: 30.0,
        description: 'Гидрокостюм из неопрена толщиной 5 мм для холодной воды.',
        image:
          'https://divingwolf.ru/upload/iblock/f65/f6532e482a9cb61c35c8e8e42ea513de.jpg',
        isRented: false,
        user_id: 2,
        diveLocation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ласты',
        price: 15.0,
        description: 'Легкие и прочные ласты для подводного плавания.',
        image: 'https://scuba-shop.ru/media/shop/1523295557.jpg',
        isRented: false,
        user_id: 1,
        diveLocation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Регулятор',
        price: 50.0,
        description:
          'Регулятор для дайвинга Scubapro Mk25 Evo Din/A700. Высокопроизводительный регулятор со сбалансированными характеристиками для погружения в воде любой температуры.',
        image: 'https://scuba-shop.ru/media/shop/1558804245.jpg',
        isRented: true,
        user_id: 2,
        diveLocation_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Equipment', null, {});
  },
};
