import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';
import saveLocalStorage from '../helpers/saveLocalStorage';

export default function ProductCard({ productDetails }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const { name, price, urlImage, id } = productDetails;

  // Remove item do carrinho e local storage
  const removeItemFromCart = (filteredCar) => {
    setCart(filteredCar);
    saveLocalStorage('cart', filteredCar);
  };

  // Atualiza carrinho e local storage
  const updateCart = (filteredCar) => {
    const newCart = [...filteredCar, { ...productDetails, quantity }];
    setCart(newCart);
    saveLocalStorage('cart', newCart);
  };

  // Gerencia atualizações do carrinho e localstorage
  const handleCart = () => {
    const oldCart = cart;
    const filteredCar = oldCart.filter((product) => product.id !== id);
    if (!quantity) return removeItemFromCart(filteredCar);
    updateCart(filteredCar);
  };

  // Diminui em 1 a quantidade do produto no estado mantendo o calor mínimo de 0
  const removeProducts = () => {
    if (quantity <= 1) return setQuantity(0);
    setQuantity((prevState) => (prevState - 1));
  };

  // Aumenta em 1 a quantidade do produto no estado
  const addProducts = () => (setQuantity((prevState) => (prevState + 1)));

  useEffect(() => {
    handleCart();
  }, [quantity]);

  // Carrega items salvos no carrinho ao atualizar a página
  useEffect(() => {
    const loadQuantity = () => {
      const itemOnState = cart.find((product) => product.id === id);
      if (itemOnState) setQuantity(itemOnState.quantity);
    };

    loadQuantity();
  }, []);

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
