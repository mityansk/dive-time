/* eslint-disable no-unused-vars */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Equipment', [
      {
        name: 'Акваланг',
        price: 20.0,
        description: 'Высококачественный акваланг для подводного плавания.',
        image:
          'https://www.scubamarket.ru/upload/medialibrary/9ee/9ee174cd6e76073fe2f2e13a1d913017.jpg',
        isRented: false,
        address: 'Улица Ленина, дом 1, Москва, Россия',
        coordinates: [55.7558, 37.6173],
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Маска для дайвинга',
        price: 10.0,
        description: 'Удобная маска с широким обзором для подводного плавания.',
        image:
          'https://www.scubamarket.ru/upload/iblock/5d2/5d20050d5e3602a74f91a341812c1fdb.jpg',
        isRented: false,
        address: 'Улица Невского, дом 5, Санкт-Петербург, Россия',
        coordinates: [59.9343, 30.3351],
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Гидрокостюм',
        price: 30.0,
        description: 'Гидрокостюм из неопрена толщиной 5 мм для холодной воды.',
        image:
          'https://www.scubamarket.ru/upload/iblock/5de/ofvupikcpdknplv29izcbsjvobahcsku.jpg',
        isRented: false,
        address: 'Улица Куйбышева, дом 10, Казань, Россия',
        coordinates: [55.8304, 49.0661],
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Ласты ',
        price: 15.0,
        description:
          'Легкие и прочные ласты Mares Avanti Quattro+ для подводного плавания цвет:лайм,размер: S',
        image:
          'https://www.scubamarket.ru/upload/iblock/5d7/5d7db4c414e98c9767d411c11794e5cf.jpg',
        isRented: false,
        address: 'Улица Советская, дом 20, Новосибирск, Россия',
        coordinates: [55.0084, 82.9357],
        user_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Регулятор',
        price: 50.0,
        description:
          'Регулятор для дайвинга Scubapro Mk25 Evo Din/A700. Высокопроизводительный регулятор со сбалансированными характеристиками для погружения в воде любой температуры.',
        image:
          'https://www.scubamarket.ru/upload/iblock/088/088a45711e406df469147930677379ed.jpg ',
        isRented: false,
        address: 'Улица Пушкина, дом 15, Екатеринбург, Россия',
        coordinates: [56.8389, 60.6057],
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Сумка-мешок ',
        price: 50.0,
        description:
          'Сумка-мешок Scorpena Breeze материал: усиленный ПВХ, объем - 2л,герметичные сварные швы, плечевая лямка, цвет: красный',
        image:
          'https://www.scubamarket.ru/upload/iblock/228/5nl43qvdnhfiwvzd9e1u23q82yipd3vf.jpg',
        isRented: false,
        address: 'Улица Полевая, дом 11, Иркутск, Россия',
        coordinates: [52.315751, 104.307035],
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Жилет для дайвинга  ',
        price: 50.0,
        description:
          'Жилет для дайвинга Scubapro Equalizer материал: нейлон 420В,интегрированная грузовая система,4 D-кольца,2 боковых кармана,2 кармана для октопуса,размер: M',
        image:
          'https://www.scubamarket.ru/upload/iblock/899/8995161e6c231a77728a7163fe0f9914.jpg',
        isRented: false,
        address: 'Улица Яковлева, дом 19, Иркутск, Россия',
        coordinates: [52.316516, 104.314158],
        user_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Equipment', null, {});
  },
};
