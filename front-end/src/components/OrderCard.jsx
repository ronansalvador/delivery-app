import React from 'react';
import PropTypes from 'prop-types';

export default function OrderCard({ orderDetails }, currentRole) {
  const { id, status, saleDate, totalPrice, address } = orderDetails;
  return (
    <div>
      <p data-testid={ `${currentRole}_orders__element-order-id-${id}` }>
        {`pedido: ${id}`}
      </p>
      <p data-testid={ `${currentRole}_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <div>
        <p data-testid={ `${currentRole}_orders__element-order-date-${id}` }>
          {saleDate}
        </p>
        <p data-testid={ `${currentRole}_orders__element-card-price-${id}` }>
          {totalPrice}
        </p>
      </div>
      { currentRole === 'seller'
      && <p>{ address }</p> }
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
