"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        field: 'name',
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        field: 'email',
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING(32),
        field: 'password',
        allowNull: false
      },
      role: {
        type: Sequelize.STRING(20),
        field: 'role',
        allowNull: false
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
