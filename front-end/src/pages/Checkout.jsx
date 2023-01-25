import React, { useState } from 'react';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import checkoutMock from '../mocks/checkoutItensMock';

export default function Checkout() {
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  return (
    <div>
      <h3>Finalizar pedido</h3>
      <Navbar />
      { checkoutMock.map((item, index) => (<CheckoutItem
        key={ index }
        itemDetails={ item }
      />)) }
      <h3 data-testid="customer_checkout__element-order-total-price">
        Total: vários reais
      </h3>
      <div>
        <h3>Detalhes e Endereço de entrega</h3>
        <label htmlFor="seller_name">
          P. Vendedora Responsável:
          <select
            name="sellers"
            id="seller_name"
            data-testid="customer_checkout__select-seller"
            onChange={ (target) => setSeller(target.value) }
          >
            <option value="fulano">fulano</option>
            <option value="cicrano">cicrano</option>
            <option value="beltrano">beltrano</option>
          </select>
        </label>
        <label htmlFor="order_address">
          Endereço
          <input
            type="text"
            id="order_address"
            data-testid="customer_checkout__input-address"
            onChange={ (target) => setAddress(target.value) }
          />
        </label>
        <label htmlFor="order_address_number">
          Número
          <input
            type="number"
            id="order_address_number"
            data-testid="customer_checkout__input-address-number"
            onChange={ (target) => setAddressNumber(target.value) }
          />
        </label>
        <button type="button" data-testid="customer_checkout__button-submit-order">
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
