import React from 'react';
import PropTypes from 'prop-types';

export default function OrderCard({ orderDetails }) {
  const { id, status, saleDate, totalPrice } = orderDetails;
  return (
    <div>
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {`pedido: ${id}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <div>
        <p data-testid={ `customer_orders__element-order-date-${id}` }>
          {saleDate}
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          {totalPrice}
        </p>
      </div>
    </div>
  );
}

OrderCard.propTypes = {
  orderDetails: PropTypes.objectOf({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
};
