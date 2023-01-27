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
  Product.associate = (models) => { 
    Product.hasMany(models.SalesProduct, { foreignKey: 'productId', as: 'products' })};
  return Product;
};
