const { Sale, SalesProduct } = require('../database/models');

const createSales = async (checkout) => {
  const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart } = checkout;

  // Status da compra é setado como "pendente" por padrão.
  const status = 'Pendente';
  
  // Cria uma compra na tabela Sales
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

  // Sales e Sales_Products são tabelas ralacionadas
  // Esse Promise.all pega o id e quantidade do carrinho e passa para a tabale Sales_Products.
  Promise.all(cart.map(async ({ id, quantity }) => SalesProduct
  .create({ saleId, productId: id, quantity })));

  return { type: 201, message: { cart, ...sale } };
};

module.exports = { createSales };
