import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment/moment';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import UserContext from '../context/UserContext';
import ButtonOrdersDetails from '../components/ButtonOrdersDetails';

export default function CustomerOrdersDetails() {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { saleId, seller } = state;
  const [currSale, setCurrSale] = useState({});
  const [index, setIndex] = useState(0);
  const { sales, user, getSales } = useContext(UserContext);

  // Salvo conteúdo do data-testid em constante para evitar erros de lint
  const SELLER_ID = 'customer_order_details__element-order-details-label-seller-name';
  const STATUS_ID = '_order_details__element-order-details-label-delivery-status';
  const ORDER_ID = '_order_details__element-order-details-label-order-id';
  const DATE_ID = '_order_details__element-order-details-label-order-date';

  // Busca no estado a sale com o id correspondente a rota e salva ela e seu index no estado
  useEffect(() => {
    const findSaleById = () => {
      if (!sales.length) return;
      const currentSale = sales.find((sale) => sale.id === saleId);
      const saleIndex = sales.indexOf((sale) => sale.id === saleId);
      setCurrSale(currentSale);
      setIndex(saleIndex);
      setLoading(false);
    };
    findSaleById();
  }, [sales]);

  // função que altera o status do pedido no backend

  const updateStatus = async (status) => {
    setLoading(true);
    try {
      const data = { status };
      const headers = { headers: { authorization: user.token } };
      await axios.put(`http://localhost:3001/sales/status/${currSale.id}`, data, headers);
      getSales();
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

  return (
    <>
      <Navbar />
      <div className="details-page">
        { loading
          ? <div className="loading" />
          : (
            <div className="details-details">
              <div className="detials-description">
                <p
                  data-testid={ `${user.role}${ORDER_ID}` }
                >

                  {currSale.id < +'9'
                    ? `Pedido: 0${currSale.id}` : `Pedido: ${currSale.id}`}

                </p>
                {/* somente para customer */}
                {(user.role === 'customer') && (
                  <p
                    data-testid={ SELLER_ID }
                  >
                    {`Vend: ${seller.name}`}
                  </p>
                )}
                <p
                  data-testid={ `${user.role}${DATE_ID}` }
                >
                  {moment(currSale.saleDate).format('DD/MM/YYYY')}
                </p>
                <p
                  data-testid={ `${user.role}${STATUS_ID}${index}` }
                >
                  {currSale.status}
                </p>
                {/* somente para customer */}
                <ButtonOrdersDetails
                  status={ currSale.status }
                  updateStatus={ updateStatus }
                />
              </div>
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

                </div>
                {currSale.cart && currSale.cart.map((item, itemIndex) => (
                  <CheckoutItem
                    key={ `${itemIndex}-order_details` }
                    index={ itemIndex }
                    itemDetails={ item }
                    pageTestId={ `${user.role}_order_details` }
                  />))}
              </div>
              <p className="details-total">
                {'Total: R$ '}
                <span
                  data-testid={ `${user.role}_order_details__element-order-total-price` }
                >
                  {currSale.totalPrice
                  && Number(currSale.totalPrice).toFixed(2).replace('.', ',')}
                </span>
              </p>
            </div>
          ) }
      </div>
    </>

  );
}
