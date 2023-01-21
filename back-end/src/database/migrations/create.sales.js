"use strict"

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales', {
      id: {
        type: Sequelize.INTEGER,
        field: 'id',
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price',
        allowNull: false
      },
      deliveryAddress: {
        type: Sequelize.STRING(100),
        field: 'delivery_address',
        allowNull: false
      },
      deliveryNumber: {
        type: Sequelize.STRING(50),
        field: 'delivery_number',
        allowNull: false
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        allowNull: false
      },
      status: {
        type: Sequelize.STRING(50),
        field: 'status',
        allowNull: false
      },
      userId: {
        type: Sequelize.INTEGER,
        field: 'user_id'
      },
      sallerId: {
        type: Sequelize.INTEGER,
        field: 'saller_id'
      }
    })
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('sales');
  }
};
