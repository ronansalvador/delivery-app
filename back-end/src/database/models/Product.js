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
    urlImage: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
  }, {
    timestamps: false,
    tableName: 'products',
    underscored: true,
  });
  // Product.associate = function(models) {
  //   Product.hasMany(models.SaleProduct, { foreignKey: 'product_id', as: 'product' });
  // };
  return Product;
};
