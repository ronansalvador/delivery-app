module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    },
    price: {
      type: DataTypes.DECIMAL(4, 2)
    },
    url_image: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {});
  Product.associate = function(models) {
    Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'product' });
  };
  return Product;
};
