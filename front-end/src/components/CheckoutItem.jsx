import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';

export default function CheckoutItem(props) {
  const { itemDetails: { id, name, quantity, price }, index } = props;
  const { cart, setCart } = useContext(CartContext);

  const removeItem = () => {
    const oldCart = cart;
    const newCart = oldCart.filter((product) => product.id !== id);
    setCart(newCart);
  };

  return (
    <div>
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}
      </p>
      <p>
        {'R$ '}
        <span
          data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
        >
          {Number(price).toFixed(2).replace('.', ',')}
        </span>
      </p>
      <p>
        {'R$ '}
        <span
          data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
        >
          {(Number(price) * quantity).toFixed(2).replace('.', ',')}
        </span>
      </p>
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
        onClick={ removeItem }
      >
        Remover
      </button>
    </div>
  );
}

CheckoutItem.propTypes = {
  itemDetails: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
