const SaleModel = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL(9, 2),
      allowNull: false
    },
    deliveryAddress: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    deliveryNumber: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    saleDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'sales',
    underscored: true,
  })

  Sale.belongsTo(User, {
    as: 'id',
    foreignKey: 'user_id'
  })

  return Sale;
}

module.exports = SaleModel;
