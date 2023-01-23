module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('products', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      price: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: false
      },
      url_image: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: ''
      }
    });
  },
  down: (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('products');
  }
};
