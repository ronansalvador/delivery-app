const productService = require('../services/product.service');

const getAllProducts = async (_req, res) => {
  const { type, message } = await productService.getAllProducts();
  
  return res.status(type).json(message);
};

module.exports = {
  getAllProducts,
};
