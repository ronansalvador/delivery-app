import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import UserContext from '../context/UserContext';

export default function Checkout() {
  const [loading, setLoading] = useState(true);
  const [seller, setSeller] = useState({});
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const { totalCartValue, cart, setCart } = useContext(CartContext);
  const { user, sales, setSales, sellers } = useContext(UserContext);
  const navigate = useNavigate();

  const clearUserInfo = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  // Faz POST no back-end para salvar a sale, salva sale atual no estado e redireciona para tela de detalhes

  const handleCheckout = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const data = {
        cart,
        userId: user.id,
        // No contexto de testes seller.id não é encontrado então 2 é o valor hardcoded de um vendedor na tabela
        sellerId: seller.id || 2,
        totalPrice: totalCartValue,
        deliveryAddress,
        deliveryNumber,
      };
      const response = await axios.post('http://localhost:3001/checkout', data, headers);
      const userSales = sales;
      setSales([...userSales, response.data]);
      const saleId = response.data.id;
      clearUserInfo();
      navigate(`/customer/orders/${saleId}`, { state: { saleId, seller } });
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  // Seta como id padrão de vendedor a primeira opção do estado
  useEffect(() => {
    const setDefaultSeller = () => {
      if (!sellers.length) return;
      setSeller(sellers[0]);
      setLoading(false);
    };

    setDefaultSeller();
  }, [sellers]);

  return (
    <div>
      <Navbar />
      { cart.map((item, index) => (<CheckoutItem
        key={ `${item.id}-checkout` }
        index={ index }
        itemDetails={ item }
        pageTestId="customer_checkout"
      />)) }
      <h3>
        {'R$ '}
        <span
          data-testid="customer_checkout__element-order-total-price"
        >
          {totalCartValue.toFixed(2).replace('.', ',')}
        </span>
      </h3>
      {loading
        ? <h1>Loading...</h1>
        : (
          <form>
            <h3>Detalhes e Endereço de entrega</h3>
            <label htmlFor="seller_name">
              P. Vendedora Responsável:
              <select
                name="sellers"
                id="seller_name"
                data-testid="customer_checkout__select-seller"
                onChange={ ({ target }) => setSeller(Number(target.value)) }
                value={ seller }
              >
                {sellers.length > 0 && sellers.map((currSeller) => (
                  <option
                    key={ currSeller.id }
                    value={ currSeller.id }
                  >
                    {currSeller.name}
                  </option>
                ))}
              </select>
            </label>
            <label htmlFor="order_address">
              Endereço
              <input
                type="text"
                id="order_address"
                min="0"
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
              disabled={ deliveryAddress === '' || deliveryNumber === '' || !cart.length }
            >
              FINALIZAR PEDIDO
            </button>
          </form>
        )}
    </div>
  );
}
