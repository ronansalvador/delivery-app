import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function ProductCard({ productDetails }) {
  const { cart, setCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(0);
  const { name, price, urlImage, id } = productDetails;

  const updateCart = () => {
    if (!quantity) return;
    const teste = cart.find((product) => product.id === id);
    if (!teste) return setCart([...cart, { ...productDetails, quantity }]);
    // teste.quantity = quantity;
    const cartIndex = cart.findIndex((item) => item.id === id);
    console.log(cartIndex);
    const cartOld = cart.find((product) => product.id !== id);
    console.log('cartOld', cartOld);
    setCart([...cartOld, { ...productDetails, quantity }]);

    // setCart({ ...productDetails, quantity });
  };

  const removeProducts = () => {
    if (quantity <= 1) return setQuantity(0);
    setQuantity((prevState) => (
      prevState - 1
    ));
  };
  const addProducts = () => {
    setQuantity((prevState) => (
      prevState + 1
    ));
  };

  useEffect(() => {
    updateCart();
  }, [quantity]);

  return (
    <div>
      <p
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {(price.toFixed(2).toString()).replace('.', ',')}
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
        // onChange={ ({ target }) => handleInputQuantity(target) }
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
  productDetails: PropTypes.objectOf({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    urlImage: PropTypes.string,
  }).isRequired,
};
