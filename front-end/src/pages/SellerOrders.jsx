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
      { sales.map((order) => (<OrderCard
        key={ order.id }
        orderDetails={ order }
      />)) }
    </div>
  );
}
