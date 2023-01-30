const { Sale, SalesProduct, Product } = require('../database/models');

const saleById = async (sale) => {
  // Verifica se sale existe, caso contrario ele retorna um objeto vazio.
  if (!sale) {
    return { type: 200, message: {} };
  }

  // Função que retorna detalhes do pedido.
  const salesProduct = await Promise.all(sale.map(async (curr, index) => {
    const cartInfo = await SalesProduct.findAll({ where: { saleId: curr.id } });

  // Função que adiciona o carrinho(cart) de compras dentro do detalhes do pedido. 
    const cart = await Promise.all(cartInfo.map(async (cartItem, cartIndex) => {
      const currCartItem = await Product.findOne({ where: { id: cartItem.productId }, raw: true });
      return { ...currCartItem, quantity: cartInfo[cartIndex].quantity };
    }));

    return { ...sale[index], cart };
  }));
  return { type: 200, message: [...salesProduct] };
};

// Retorna detalhes do pedido para o cliente.
const saleByCustomerId = async (id) => {
  const sale = await Sale.findAll({ where: { userId: Number(id) }, raw: true });
  return saleById(sale);
};

// Retorna detalhes do pedido para o vendedor.
const saleBySellerId = async (id) => {
  const sale = await Sale.findAll({ where: { sellerId: Number(id) }, raw: true });
  return saleById(sale);
};

module.exports = { saleByCustomerId, saleBySellerId };
