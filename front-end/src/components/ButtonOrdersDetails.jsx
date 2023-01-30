import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function ButtonOrdersDetails() {
  const { user } = useContext(UserContext);
  console.log(user.role);
  return (
    <div>
      {(user.role === 'customer') && (
        <button
          type="button"
          data-testid="customer_order_details__button-delivery-check"
          disabled
          onClick={ () => console.log('WIP') }
        >
          Marcar Como Entregue
        </button>)}
      {(user.role === 'seller') && (
        <>
          <button
            type="button"
            data-testid="seller_order_details__button-preparing-check"
          >
            Preparar Pedido
          </button>
          <button
            type="button"
            data-testid="seller_order_details__button-dispatch-check"
          >
            Saiu para entrega
          </button>
        </>
      )}
    </div>
  );
}
