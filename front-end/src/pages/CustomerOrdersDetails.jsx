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
  const { sales, products } = useContext(UserContext);

  // Salvo conteúdo do data-testid em constante para evitar erros de lint
  const SELLET_ID = 'customer_order_details__element-order-details-label-seller-name';
  const STATUS_ID = 'customer_order_details__element-order-details-label-delivery-status';

  // TEMPORÁRIO
  // As informações usadas vem da rota GET /sales/:id e são salvas no estado "sales"
  // Não existe uma forma fácil de acessar o nome do produto, então é necessário comparar o seu id com o de todos os produtos
  // Será atualizada a rota do back-end para retornar o nome do produto e a criação do card vai ser simplificada
  const createItemCard = (item, itemIndex) => {
    const itemDetails = products.find((product) => product.id === item.productId);
    return (
      <CheckoutItem
        key={ `${item.id}-order_details` }
        index={ itemIndex }
        itemDetails={ { ...itemDetails, quantity: item.quantity } }
        pageTestId="order_details"
      />
    );
  };

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
              data-testid={ SELLET_ID }
            >
              {seller.name}
            </p>
            <p
              data-testid="customer_order_details__element-order-details-label-order-date"
            >
              {moment(currSale.saleDate).format('DD/MM/YYYY')}
            </p>
            <p
              data-testid={ `${STATUS_ID}${index}` }
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
              createItemCard(item, mapIndex)))}
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
