'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Shoes", [
      {
        id: 1,
        name: "Adidas Nite Joger",
        img: "adidas-nite-joger.png",
        stock: 30,
        price: 1800000,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        id: 2,
        name: "Nike Cortez Basic Shoe",
        img: "nike-cortez-basic-shoe.png",
        stock: 5,
        price: 1900000,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        id: 3,
        name: "Nike Cortez Basic Shoe",
        img: "nike-cortez-basic-shoe.png",
        stock: 5,
        price: 1900000,
        createdAt: new Date,
        updatedAt: new Date
      }
    ])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Shoes', null, {});
  }
};
