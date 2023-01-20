"use strict"

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING(255)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      password: {
        type: Sequelize.STRING(255)
      },
      role: {
        type: Sequelize.STRING(255)
      },
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
