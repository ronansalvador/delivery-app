module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    seller_id: {
      type: DataTypes.INTEGER,
      foreignKey: true
    },
    total_price: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false
    },
    delivery_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    delivery_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    sale_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  });
  Sale.associate = (models) => {
    Sale.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    Sale.belongsTo(models.User, { foreignKey: 'seller_id', as: 'seller' });
    // Sale.hasMany(models.SaleProduct, { foreignKey: 'sale_id', as: 'sale' });
  };
  return Sale;
};
