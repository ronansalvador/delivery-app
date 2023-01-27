import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';

export default function Checkout() {
  const [sellers, setSellers] = useState([]);
  const [sellerId, setSellerId] = useState('2');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const { totalCartValue, cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  // Faz POST no back-end para salvar a sale, redireciona para tela de detalhes
  const handleCheckout = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const data = {
        cart,
        userId: user.id,
        sellerId,
        totalPrice: totalCartValue,
        deliveryAddress,
        deliveryNumber,
      };
      const response = await axios.post('http://localhost:3001/checkout', data, headers);
      navigate(`/customer/orders/${response.data.id}`);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  // Faz GET no back-end para receber lista de pessoas vendedoras, salva no estado e faz map no select
  // WORK IN PROGRESS
  useEffect(() => {
    const getSellers = async () => {
      try {
        // const headers = { headers: { authorization: user.token } };
        // const allSellers = await axios.get('http://localhost:3001/sellers', headers);
        const allSellers = [
          { id: 2, name: 'Fulana Pereira' },
        ];
        setSellers(allSellers);
        setSellerId(allSellers[0].id);
      } catch (error) {
        const unauthorizedCode = 401;
        if (error.response.status === unauthorizedCode) return handleLogout();
      }
    };

    getSellers();
  }, []);

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
            onChange={ ({ target }) => setSellerId(Number(target.value)) }
            value={ sellerId }
          >
            {sellers.length > 0 && sellers.map((seller) => (
              <option key={ seller.id } value={ seller.id }>{seller.name}</option>
            ))}
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
          // disabled={ deliveryAddress === '' || deliveryNumber === '' }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
