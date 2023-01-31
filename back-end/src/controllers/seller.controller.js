const sellerService = require('../services/seller.service');

const getAllSellers = async (_req, res) => {
  const { type, message } = await sellerService.getAllSellers();
  
  return res.status(type).json(message);
};

module.exports = {
  getAllSellers,
};
