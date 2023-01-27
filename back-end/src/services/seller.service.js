const { User } = require('../database/models');

const getAllSellers = async () => {
  const getAll = await User.findAll({ attributes: ['id', 'name'], 
    where: { role: 'seller' } });
  return { type: 200, message: [...getAll] };
};

module.exports = { getAllSellers };
