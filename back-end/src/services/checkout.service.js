const { Sale } = require('../database/models');
// const { createSalesProduct } = require('./saleProduct.service');

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
  // const saleId = sale.id;

  // createSalesProduct(cart, saleId);

  return { type: 201, message: { cart, ...sale } };
};

module.exports = { createSales };
