const { Product } = require('../database/models');

const getAllProducts = async () => {
  // Busca todos os produtos no banco de dados.
  const findAllProducts = await Product.findAll({ raw: true });

  return { type: 201, message: findAllProducts };
};

module.exports = { getAllProducts };
