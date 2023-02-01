import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';
// import sellerOrdersMock from '../mocks/sellerOrderMock';

export default function CustomerOrders() {
  // console.log(sellerOrdersMock);
  const { sales } = useContext(UserContext);
  console.log(sales);
  return (
    <div>
      <Navbar />
      <div className="page-order-card">
        { sales.map((order) => (
          <div className="order-card-container" key={ order.id }>
            <OrderCard
              orderDetails={ order }
            />
          </div>
        )) }
      </div>
    </div>
  );
}
