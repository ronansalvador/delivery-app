import React from 'react';
import Navbar from '../components/Navbar';

export default function CustomerOrdersDetails() {
  return (
    <div>
      <Navbar />
      <h2>Detalhes do Pedido</h2>
      <p
        data-testid="customer_order_details__element-order-details-label-order-id"
      >
        ID
      </p>
      <p
        data-testid="customer_order_details__element-order-details-label-seller-name"
      >
        SELLER NAME
      </p>
      <p
        data-testid={
          `customer_order_details__element-order-details-label-delivery-status${'index'}`
        }
      >
        STATUS
      </p>
      <button
        type="button"
        onClick={ () => console.log('WIP') }
      >
        Marcar Como Entregue
      </button>
    </div>
  );
}
