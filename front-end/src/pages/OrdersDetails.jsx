import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment/moment';
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
  const { sales, user } = useContext(UserContext);

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

  return (
    <div>
      <Navbar />
      { loading
        ? <h1>Loading...</h1>
        : (
          <>
            <h2>Detalhes do Pedido</h2>
            <p
              data-testid={ `${user.role}${ORDER_ID}` }
            >
              {currSale.id}
            </p>
            {/* somente para customer */}
            {(user.role === 'customer') && (
              <p
                data-testid={ SELLER_ID }
              >
                {seller.name || 'Fulana Pereira'}
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
            <ButtonOrdersDetails />
            {currSale.cart && currSale.cart.map((item, itemIndex) => (
              <CheckoutItem
                key={ `${itemIndex}-order_details` }
                index={ itemIndex }
                itemDetails={ item }
                pageTestId={ `${user.role}_order_details` }
              />))}
            <p>
              {'Total: R$ '}
              <span
                data-testid={ `${user.role}_order_details__element-order-total-price` }
              >
                {currSale.totalPrice
                  && Number(currSale.totalPrice).toFixed(2).replace('.', ',')}
              </span>
            </p>
          </>
        ) }
    </div>

  );
}
