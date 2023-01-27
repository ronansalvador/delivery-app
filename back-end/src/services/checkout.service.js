const { Sale, SalesProduct } = require('../database/models');

const createSales = async (checkout) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart } = checkout;

  const status = 'Pendente';

  const createSale = await Sale.create({
    userId, 
    sellerId, 
    totalPrice, 
    deliveryAddress,
    deliveryNumber, 
    status,
    saleDate: new Date(),
  });

  const sale = createSale.dataValues;
  const saleId = sale.id;

  Promise.all(cart.map(async ({ id, quantity }) => SalesProduct
  .create({ saleId, productId: id, quantity })));

  return { type: 201, message: { cart, ...sale } };
};

module.exports = { createSales };
