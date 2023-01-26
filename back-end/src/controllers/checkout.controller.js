const checkoutService = require('../services/checkout.service');

const createSale = async (req, res) => {
  // const { email, password } = req.body;
  const { type, message } = await checkoutService.login();
  
  return res.status(type).json(message);
};

module.exports = { createSale };
