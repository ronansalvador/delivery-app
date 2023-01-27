import React, { useState, useEffect, useContext } from 'react';
import moment from 'moment/moment';
import { useLocation } from 'react-router-dom';
import CheckoutItem from '../components/CheckoutItem';
import Navbar from '../components/Navbar';
import UserContext from '../context/UserContext';

export default function CustomerOrdersDetails() {
  const [loading, setLoading] = useState(true);
  const { state } = useLocation();
  const { saleId, seller } = state;
  const [currSale, setCurrSale] = useState({});
  const [index, setIndex] = useState(0);
  const { sales } = useContext(UserContext);

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
              data-testid="customer_order_details__element-order-details-label-order-id"
            >
              {currSale.id}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-seller-name"
            >
              {seller.name}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {moment(currSale.saleDate).format('DD/MM/YYYY')}
            </p>
            <p
              data-testid={
                `customer_order_details__element-order-details-label-delivery-status${index}`
              }
            >
              {currSale.status}
            </p>
            <button
              type="button"
              data-testid="customer_order_details__button-delivery-check"
              disabled
              onClick={ () => console.log('WIP') }
            >
              Marcar Como Entregue
            </button>
            {currSale.cart && currSale.cart.map((item, mapIndex) => (
              <CheckoutItem
                key={ item.id }
                index={ mapIndex }
                itemDetails={ item }
                pageTestId="order_details"
              />
            ))}
            <p>
              {'Total: R$ '}
              <span data-testid="customer_order_details__element-order-total-price">
                {currSale.totalPrice
                  && Number(currSale.totalPrice).toFixed(2).replace('.', ',')}
              </span>
            </p>
          </>
        ) }
    </div>

  );
}
