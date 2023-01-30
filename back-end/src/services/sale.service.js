const { Sale, SalesProduct, Product } = require('../database/models');

const saleById = async (sale) => {
  // const sale = await Sale.findAll({ where: { userId: Number(id) }, raw: true });

  if (!sale) {
    return { type: 200, message: {} };
  }

  const salesProudct = await Promise.all(sale.map(async (curr, index) => {
    const cartInfo = await SalesProduct.findAll({ where: { saleId: curr.id } });

    const cart = await Promise.all(cartInfo.map(async (cartItem, cartIndex) => {
      const currCartItem = await Product.findOne({ where: { id: cartItem.productId }, raw: true });
      return { ...currCartItem, quantity: cartInfo[cartIndex].quantity };
    }));

    return { ...sale[index], cart };
  }));
  
  return { type: 200, message: [...salesProudct] };
};

const saleByCustomerId = async (id) => {
  const sale = await Sale.findAll({ where: { userId: Number(id) }, raw: true });
  return saleById(sale);
};

const saleBySellerId = async (id) => {
  const sale = await Sale.findAll({ where: { sellerId: Number(id) }, raw: true });
  return saleById(sale);
};

module.exports = { saleByCustomerId, saleBySellerId };
