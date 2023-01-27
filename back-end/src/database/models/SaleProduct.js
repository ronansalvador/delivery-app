module.exports = (sequelize, DataTypes) => {
  const SalesProduct = sequelize.define('SalesProduct', {
    saleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'sales',
        key: 'id'
      }
    },
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: false,
    tableName: 'sales_products',
    underscored: true,
  });
    SalesProduct.associate = (models) => {
      models.Sale.belongsToMany(models.Product, {
        as: 'products',
        through: SalesProduct,
        foreignKey: 'saleId',
        otherKey: 'productId',
    });
      models.Product.belongsToMany(models.Sale, {
        as: 'sales',
        through: SalesProduct,
        foreignKey: 'productId',
        otherKey: 'saleId',
    });
  } 
  return SalesProduct;
}
