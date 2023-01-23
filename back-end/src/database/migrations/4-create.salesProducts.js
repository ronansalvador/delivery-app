module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('sales_products', {
      sale_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'sales',
          key: 'id'
        }
      },
      product_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'products',
          key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      }
    });
  },

  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('sales_products');
  }
};

