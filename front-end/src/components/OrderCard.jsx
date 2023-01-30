import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';

export default function OrderCard({ orderDetails }) {
  const {
    id,
    status,
    saleDate,
    totalPrice,
    sellerId,
    deliveryAddress,
    deliveryNumber,
  } = orderDetails;

  const { sellers, user } = useContext(UserContext);
  const currentRole = user.role;
  const navigate = useNavigate();

  // direcionar de acordo com a role
  const goToOrderDetails = () => {
    const seller = sellers.find((saleSeller) => saleSeller.id === sellerId);
    navigate(`/${user.role}/orders/${id}`, { state: { saleId: id, seller } });
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
      && <p>{ `${deliveryAddress}, ${deliveryNumber} ` }</p> }
    </button>
  );
}

OrderCard.propTypes = {
  orderDetails: PropTypes.shape({
    id: PropTypes.number,
    status: PropTypes.string,
    saleDate: PropTypes.string,
    totalPrice: PropTypes.number,
    sellerId: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.number,
  }).isRequired,
};
