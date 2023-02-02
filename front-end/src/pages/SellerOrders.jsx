import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';

export default function CustomerOrders() {
  const { sales } = useContext(UserContext);
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
