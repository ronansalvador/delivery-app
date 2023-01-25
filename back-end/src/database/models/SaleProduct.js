module.exports = (sequelize, DataTypes) => {
  const SaleProduct = sequelize.define('SalesProduct', {
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
    tableName: 'sales_product',
    underscored: true,
  });
  SaleProduct.associate = function(models) {
    SaleProduct.belongsTo(models.Sale, { foreignKey: 'sale_id', as: 'sale' });
    SaleProduct.belongsTo(models.Product, { foreignKey: 'product_id', as: 'product' });
  };
  return SaleProduct;
};
