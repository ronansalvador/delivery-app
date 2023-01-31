const { User } = require('../database/models');

const getUsers = async () => {
    const users = await User.findAll();
    return users;
  };


const postUser = async ({ name, email, password, role }) => {
    const adminNewUser = await User.findOne({ where: { email, name }, raw: true });

  if (adminNewUser) {
    return { type: 409, message: { message: 'usuário já existe' } };
  }

  const decrypt = decryptMD5.createHash(password);
  const newUser = await User.create({ name, email, password: decrypt, role });
  const { password: _, ...userWithoutPassword } = newUser.dataValues;
  const token = jwt.newToken(userWithoutPassword);
  const { id } = newUser.dataValues; 
  return { type: 201, message: { id, name, email, role, token } };
};


const deleteUser = async ({ id }) => {
    const deletedUser = await Users.destroy({ where: { id: id }});

    if (deletedUser)
      return { type: 200, message: { message: 'Usuário deletado' } };
        
};


module.exports = {
    getUsers,
    postUser,
    deleteUser
}
