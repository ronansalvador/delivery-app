import React from 'react';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import checkoutItensMock from '../mocks/checkoutItensMock';

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
      {checkoutItensMock.map((item, index) => (
        <CheckoutItem
          key={ item.id }
          index={ index }
          itemDetails={ item }
          pageTestId="order_details"
        />
      ))}
      <p>
        {'Total: R$ '}
        <span data-testid="customer_order_details__element-order-total-price">0,00</span>
      </p>
    </div>
  );
}
