const { Sale, SalesProduct } = require('../database/models');

const saleById = async (id) => {
  const sale = await Sale.findAll({ where: { userId: Number(id) }, raw: true });

  if (!sale) {
    return { type: 200, message: {} };
  }

  const salesProudct = await Promise.all(sale.map(async (curr, index) => {
    const cart = await SalesProduct.findAll({ where: { saleId: curr.id } });
    return { ...sale[index], cart };
  }));
  
  return { type: 200, message: [...salesProudct] };
};

module.exports = { saleById };
