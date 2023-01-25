import React from 'react';
import PropTypes from 'prop-types';

export default function CheckoutItem(props) {
  const { itemDetails: { name, quantity, price }, index } = props;

  return (
    <div>
      <p
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index}
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
      <p
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        {`R$ ${Number(price)}`}
      </p>
      <p
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        {`R$ ${Number(price) * quantity}`}
      </p>
      <button
        type="button"
        data-testid={ `customer_checkout__element-order-table-remove-${index}` }
      >
        Remover
      </button>
    </div>
  );
}

CheckoutItem.propTypes = {
  itemDetails: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
