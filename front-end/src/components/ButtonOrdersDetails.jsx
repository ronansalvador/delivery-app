import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import UserContext from '../context/UserContext';

export default function ButtonOrdersDetails({ status, updateStatus }) {
  const { user } = useContext(UserContext);
  console.log(status);
  console.log(user.role);
  return (
    <div>
      {(user.role === 'customer') && (
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled={ (status !== 'Em Trânsito') }
          onClick={ () => updateStatus('emTransito') }
        >
          Marcar Como Entregue
        </button>)}
      {(user.role === 'seller') && (
        <>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ (status !== 'Pendente') }
            // click deve mudar o status para Preparando
            onClick={ () => updateStatus('pendente') }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ (status !== 'Preparando') }
            // click deve mudar o status para Em Trânsito
            onClick={ () => updateStatus('preparando') }
          >
            Saiu para entrega
          </button>
        </>
      )}
    </div>
  );
}

ButtonOrdersDetails.propTypes = {
  status: PropTypes.string.isRequired,
  updateStatus: PropTypes.func.isRequired,
};
