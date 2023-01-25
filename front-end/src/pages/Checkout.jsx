import React, { useState, useContext } from 'react';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';

export default function Checkout() {
  const [seller, setSeller] = useState('');
  const [address, setAddress] = useState('');
  const [addressNumber, setAddressNumber] = useState('');
  const { totalCartValue, cart } = useContext(CartContext);

  return (
    <div>
      <h3>Finalizar pedido</h3>
      <Navbar />
      { cart.map((item, index) => (<CheckoutItem
        key={ item.id }
        index={ index }
        itemDetails={ item }
      />)) }
      <h3 data-testid="customer_checkout__element-order-total-price">
        {`R$${totalCartValue.toFixed(2)}`}
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
            value={ seller }
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
            value={ address }
          />
        </label>
        <label htmlFor="order_address_number">
          Número
          <input
            type="number"
            id="order_address_number"
            data-testid="customer_checkout__input-address-number"
            onChange={ (target) => setAddressNumber(target.value) }
            value={ addressNumber }
          />
        </label>
        <button type="button" data-testid="customer_checkout__button-submit-order">
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
