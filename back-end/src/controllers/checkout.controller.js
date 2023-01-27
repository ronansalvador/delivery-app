const checkoutService = require('../services/checkout.service');

const createSale = async (req, res) => {
  const checkout = req.body;
  const { type, message } = await checkoutService.createSales(checkout);
  
  return res.status(type).json(message);
};

module.exports = { createSale };
