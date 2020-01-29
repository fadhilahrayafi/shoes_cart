'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Shoes", [
      {
        id: 1,
        name: "Nike Air Max",
        img: "null",
        stock: 30,
        price: 1500000,
        createdAt: new Date,
        updatedAt: new Date
      }
    ])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Shoes', null, {});
  }
};
