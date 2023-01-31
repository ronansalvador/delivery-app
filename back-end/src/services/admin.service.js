const { User } = require('../database/models');
const decryptMD5 = require('../utils/decyptConfig');

const getUsers = async () => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return { type: 200, message: [...users] };
};

const postUser = async ({ name, email, password, role }) => {
  const adminNewUser = await User.findOne({ where: { email, name }, raw: true });

  if (adminNewUser) {
    return { type: 409, message: { message: 'Usuário já existe' } };
  }

  const decrypt = decryptMD5.createHash(password);
  const newUser = await User.create({ name, email, password: decrypt, role });
  const { id } = newUser.dataValues;
  return { type: 201, message: { id, name, email, role } };
};

const deleteUser = async (id) => {
  const user = Number(id);
  const deletedUser = await User.destroy({ where: { id: user } });

  if (deletedUser) { return { type: 200, message: { message: 'Usuário deletado' } }; }
};

module.exports = {
  getUsers,
  postUser,
  deleteUser,
};
