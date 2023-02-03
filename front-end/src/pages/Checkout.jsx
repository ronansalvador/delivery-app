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
    <>
      <Navbar />
      <div className="checkout-page">
        <div className="checkout-card-container">
          <div className="checkout-item">
            <p
              className="checkout-item-index"
            >
              Item
            </p>
            <p
              className="item-name"
            >
              Descrição
            </p>
            <p
              className="checkout-item-quantity"
            >
              Quantidade
            </p>
            <p className="checkout-item-price">
              Valor
            </p>
            <p className="checkout-item-total">
              Sub-total
            </p>
            <p
              className="btn-remove"
            >
              Remover
            </p>

          </div>
          { cart.map((item, index) => (<CheckoutItem
            key={ `${item.id}-checkout` }
            index={ index }
            itemDetails={ item }
            pageTestId="customer_checkout"
          />)) }
        </div>
        <div className="checkout-datails">
          {loading
            ? <div className="loading" />
            : (
              <form className="checkout-form">
                <h3 className="checkout-title-details">Detalhes e Endereço de entrega</h3>
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
              </form>
            )}
          <h3 className="checkout-datails-total">
            {'Total R$ '}
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              {totalCartValue.toFixed(2).replace('.', ',')}
            </span>
          </h3>
        </div>
        <div className="checkout-btn-container">
          <button
            type="button"
            data-testid="customer_checkout__button-submit-order"
            className="checkout-btn"
            onClick={ handleCheckout }
            disabled={ deliveryAddress === ''
                  || deliveryNumber === '' || !cart.length }
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </div>
    </>
  );
}
