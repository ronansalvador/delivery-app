const saleService = require('../services/sale.service');

const saleByCustomerId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.saleByCustomerId(id);
  res.status(type).json(message);
};

const saleBySellerId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.saleBySellerId(id);
  res.status(type).json(message);
};

module.exports = {
  saleByCustomerId,
  saleBySellerId,
};
