import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';

export default function Checkout() {
  const [sellerId, setSellerId] = useState('2');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const { totalCartValue, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  // const navigate = useNavigate();

  const handleCheckout = async () => {
    try {
      // const headers = { headers: { authorization: user.token } };
      const data = {
        cart: { ...cart },
        userID: user.id,
        sellerId,
        totalPrice: totalCartValue,
        deliveryAddress,
        deliveryNumber,
      };
      // const saleId = await axios.post('http://localhost:3001/checkout', data, headers);
      console.log(data);
      // navigate(`localhost:3000/customer/orders/${saleId}`);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  return (
    <div>
      <h3>Finalizar pedido</h3>
      <Navbar />
      { cart.map((item, index) => (<CheckoutItem
        key={ item.id }
        index={ index }
        itemDetails={ item }
      />)) }
      <h3>
        {'R$ '}
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalCartValue.toFixed(2).replace('.', ',')}
        </span>
      </h3>
      <div>
        <h3>Detalhes e Endereço de entrega</h3>
        <label htmlFor="seller_name">
          P. Vendedora Responsável:
          <select
            name="sellers"
            id="seller_name"
            data-testid="customer_checkout__select-seller"
            onChange={ (target) => setSellerId(target.value) }
            value={ sellerId }
          >
            <option defaultValue value="2">Fulana Pereira</option>
          </select>
        </label>
        <label htmlFor="order_address">
          Endereço
          <input
            type="text"
            id="order_address"
            data-testid="customer_checkout__input-address"
            onChange={ ({ target }) => setDeliveryAddress(target.value) }
            value={ deliveryAddress }
          />
        </label>
        <label htmlFor="order_address_number">
          Número
          <input
            type="number"
            id="order_address_number"
            data-testid="customer_checkout__input-address-number"
            onChange={ ({ target }) => setDeliveryNumber(target.value) }
            value={ deliveryNumber }
          />
        </label>
        <button
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleCheckout }
          disabled={ deliveryAddress === '' || deliveryNumber === '' }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
