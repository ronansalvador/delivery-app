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
  const NOVE = 9;

  // direcionar de acordo com a role
  const goToOrderDetails = () => {
    const seller = sellers.find((saleSeller) => saleSeller.id === sellerId);
    navigate(`/${user.role}/orders/${id}`, { state: { saleId: id, seller } });
  };

  const statusCss = () => {
    switch (status) {
    case 'Pendente':
      return 'pendente';
    case 'Preparando':
      return 'preparando';
    case 'Em Trânsito':
      return 'em-transito';
    case 'Entregue':
      return 'entregue';
    default:
      return '';
    }
  };
  return (
    <button
      type="button"
      onClick={ goToOrderDetails }
      className="order-card"
    >
      <p
        data-testid={ `${currentRole}_orders__element-order-id-${id}` }
        className="index"
      >
        {id < NOVE ? `Pedido 0${id}` : `Pedido ${id}`}
      </p>
      <p
        data-testid={ `${currentRole}_orders__element-delivery-status-${id}` }
        className={ `card-status ${statusCss()}` }
      >
        {status}
      </p>
      <div className="order-card-inner">
        <p data-testid={ `${currentRole}_orders__element-order-date-${id}` }>
          {moment(saleDate).format('DD/MM/YYYY')}
        </p>
        <p>
          {'R$ '}
          <span data-testid={ `${currentRole}_orders__element-card-price-${id}` }>
            {Number(totalPrice).toFixed(2).toString().replace('.', ',')}
          </span>
        </p>
        { currentRole === 'seller'
        && <p>{ `${deliveryAddress}, ${deliveryNumber} ` }</p> }
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
    sellerId: PropTypes.number,
    deliveryAddress: PropTypes.string,
    deliveryNumber: PropTypes.string,
  }).isRequired,
};
