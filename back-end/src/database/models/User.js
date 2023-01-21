const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING(32),
        allowNull: false
      },
      role: {
        type: DataTypes.STRING(20),
        allowNull: false
      }
    },
    {
    timestamps: false,
    tableName: 'users',
    underscored: true,
  })

  User.hasMany(Sale, {
    as: 'users',
    foreignKey: 'user_id'
  })
  User.hasMany(Sale, {
    as: 'sallers',
    foreignKey: 'saller_id'
  })

  return User
}

module.exports = UserModel;
