const saleService = require('../services/sale.service');

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.saleById(id);
  res.status(type).json(message);
};

module.exports = {
  getSaleById,
};
