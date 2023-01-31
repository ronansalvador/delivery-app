import React, { useContext } from 'react';
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
          disabled={ (status === /Em Transito/i) }
          onClick={ () => updateStatus(status) }
        >
          Marcar Como Entregue
        </button>)}
      {(user.role === 'seller') && (
        <>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
            disabled={ (status !== /pendente/i) }
            // click deve mudar o status para Preparando
            onClick={ () => updateStatus(status) }
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
            disabled={ (status === /Preparando/i) }
            // click deve mudar o status para Em Trânsito
            onClick={ () => updateStatus(status) }
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
