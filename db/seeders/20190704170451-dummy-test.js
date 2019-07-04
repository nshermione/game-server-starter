'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      displayName: 'thinhth23',
      password: 'e10adc3949ba59abbe56e057f20f883e',
      email: 'thinhth23@gmail.com',
      api: true,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
