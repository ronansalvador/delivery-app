import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import CartContext from './CartContext';
// import checkoutMock from '../mocks/checkoutItensMock';

function CartProvider({ children }) {
  const [products, setProducts] = useState();
  // const [cart, setCart] = useState(checkoutMock); // DEBUG
  const [cart, setCart] = useState([]);
  const [totalCartValue, setTotalCartValue] = useState(0);

  const contextValue = React.useMemo(() => ({
    products, setProducts, cart, setCart, totalCartValue,
  }), [products, cart, totalCartValue]);

  // Calcula valor total e salva no estado sempre que o carrinho é atualizado
  useEffect(() => {
    const updateTotalValue = () => {
      if (!cart.length) return setTotalCartValue(0);
      const allProductsValue = cart.map((product) => (product.price * product.quantity));
      const totalValue = allProductsValue.reduce((acc, curr) => acc + curr);
      setTotalCartValue(totalValue);
    };

    updateTotalValue();
  }, [cart]);

  // Carrega carrinho do local storage caso a exista
  useEffect(() => {
    const loadCartFromLocalstorage = () => {
      const loadCart = localStorage.getItem('cart');
      const loadedCart = loadCart === null ? [] : JSON.parse(loadCart);
      setCart(loadedCart);
    };

    loadCartFromLocalstorage();
  }, []);

  return (
    <CartContext.Provider
      value={ contextValue }
    >
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default CartProvider;
