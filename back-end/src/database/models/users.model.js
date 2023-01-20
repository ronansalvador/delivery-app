const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    role: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
      timestamps: false,
      tableName: 'users',
      underscored: true,
  })
  return User
}

module.exports = UserModel;
