import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function ProductCard({ productDetails }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const { name, price, urlImage, id } = productDetails;

  // Gerencia atalização de produtos no carrinho
  const updateCart = () => {
    const currProduct = cart.find((product) => product.id === id);
    // Previne função de ser executada quando página é carregada pela primeira vez
    if (!quantity && !currProduct) return;
    // Adiciona produto caso não exista no carrinho
    if (!currProduct) return setCart([...cart, { ...productDetails, quantity }]);
    const oldCart = cart;
    const newCart = oldCart.filter((product) => product.id !== id);
    // Remove item do carrinho quando a quantidade é 0
    if (!quantity) return setCart(newCart);
    // Atualiza quantidade do produto no carrinho
    setCart([...newCart, { ...productDetails, quantity }]);
  };

  // Diminui em 1 a quantidade do produto no estado mantendo o calor mínimo de 0
  const removeProducts = () => {
    if (quantity <= 1) return setQuantity(0);
    setQuantity((prevState) => (prevState - 1));
  };

  // Aumenta em 1 a quantidade do produto no estado
  const addProducts = () => (setQuantity((prevState) => (prevState + 1)));

  useEffect(() => {
    updateCart();
  }, [quantity]);

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {(Number(price).toFixed(2).toString()).replace('.', ',')}
      </p>
      <img
        data-testid={ `customer_products__img-card-bg-image-${id}` }
        className="product-card-image"
        src={ urlImage }
        alt={ name }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <button
        data-testid={ `customer_products__button-card-rm-item-${id}` }
        type="button"
        onClick={ removeProducts }
      >
        -
      </button>
      <input
        type="number"
        value={ quantity }
        min="0"
        onChange={ ({ target }) => setQuantity(Number(target.value)) }
        data-testid={ `customer_products__input-card-quantity-${id}` }
      />
      <button
        data-testid={ `customer_products__button-card-add-item-${id}` }
        type="button"
        onClick={ addProducts }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  productDetails: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};
