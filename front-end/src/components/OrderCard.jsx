import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function OrderCard({ orderDetails }) {
  const { id, status, saleDate, totalPrice } = orderDetails;
  const { sellers } = useContext(UserContext);
  const navigate = useNavigate();

  const goToOrderDetails = () => {
    // const test = seler.find((saleSeller) => saleSeller.id === id);
    // console.log(sellers);
    // navigate(`/customer/orders/${id}`, { state: { saleId: id, seller } });
  };

  return (
    <button
      type="button"
      onClick={ goToOrderDetails }
    >
      <p data-testid={ `customer_orders__element-order-id-${id}` }>
        {`pedido: ${id}`}
      </p>
      <p data-testid={ `customer_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <div>
        <p data-testid={ `customer_orders__element-order-date-${id}` }>
          {moment(saleDate).format('DD/MM/YYYY')}
        </p>
        <p data-testid={ `customer_orders__element-card-price-${id}` }>
          {totalPrice}
        </p>
      </div>
    </button>
  );
}

OrderCard.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
  }).isRequired,
};
