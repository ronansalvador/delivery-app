import React from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import ordersMock from '../mocks/ordersMock';

export default function CustomerOrders() {
  return (
    <div>
      <Navbar />
      { ordersMock.map((order) => (<OrderCard
        key={ order.id }
        orderDetails={ order }
        currentRole="seller"
      />)) }
    </div>
  );
}
