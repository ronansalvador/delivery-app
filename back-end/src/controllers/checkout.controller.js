const checkoutService = require('../services/checkout.service');

const createSale = async (req, res) => {
  const checkout = req.body;
  const { type, message } = await checkoutService.createSales(checkout);
  
  return res.status(type).json(message);
};

const getByProductName = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await checkoutService.getByProductName(id);
  
  return res.status(type).json(message);
};

module.exports = { createSale, getByProductName };
