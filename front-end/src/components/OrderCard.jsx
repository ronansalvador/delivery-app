import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function OrderCard({ orderDetails }, currentRole) {
  const { id, status, saleDate, totalPrice, sellerId } = orderDetails;
  const { sellers } = useContext(UserContext);
  const navigate = useNavigate();

  const goToOrderDetails = () => {
    const seller = sellers.find((saleSeller) => saleSeller.id === sellerId);
    navigate(`/customer/orders/${id}`, { state: { saleId: id, seller } });
  };

  return (
    <button
      type="button"
      onClick={ goToOrderDetails }
    >
      <p data-testid={ `${currentRole}_orders__element-order-id-${id}` }>
        {`pedido: ${id}`}
      </p>
      <p data-testid={ `${currentRole}_orders__element-delivery-status-${id}` }>
        {status}
      </p>
      <div>
        <p data-testid={ `${currentRole}_orders__element-order-date-${id}` }>
          {moment(saleDate).format('DD/MM/YYYY')}
        </p>
        <p data-testid={ `${currentRole}_orders__element-card-price-${id}` }>
          {Number(totalPrice).toFixed(2).toString().replace('.', ',')}
        </p>
      </div>
      { currentRole === 'seller'
      && <p>{ address }</p> }
    </button>
  );
}

OrderCard.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.string,
    sellerId: PropTypes.number,
  }).isRequired,
};
