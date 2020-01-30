'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    const passwordHash = require('password-hash')
    return queryInterface.bulkInsert("Admins", [
      {
        id: 1,
        name: "fadhilah",
        email: "admin@shoecart.com",
        password: passwordHash.generate('123456'),
        createdAt: new Date,
        updatedAt: new Date
      }

    ])
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.bulkDelete('Admins', null, {});
  }
};
