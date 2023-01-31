const saleService = require('../services/sale.service');

const saleByCustomerId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.saleByCustomerId(id);
  
  return res.status(type).json(message);
};

const saleBySellerId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.saleBySellerId(id);
  
  return res.status(type).json(message);
};

const saleByUpdateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { type, message } = await saleService.saleByUpdateStatus({ id, status });

  return res.status(type).json(message);
};

module.exports = {
  saleByCustomerId,
  saleBySellerId,
  saleByUpdateStatus,
};
