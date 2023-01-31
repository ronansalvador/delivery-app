const { User } = require('../database/models');

const getAllSellers = async () => {
  // Retorna todos vendedores cadastrados no banco de dados.
  const getAll = await User.findAll({ attributes: ['id', 'name'], 
  where: { role: 'seller' } });

  return { type: 200, message: [...getAll] };
};

module.exports = { getAllSellers };
