import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import OrderCard from '../components/OrderCard';
import UserContext from '../context/UserContext';

export default function CustomerOrders() {
  const [loading, setLoading] = useState(true);
  const { sales } = useContext(UserContext);

  useEffect(() => {
    const loadSales = () => {
      if (sales.length !== 0) setLoading(false);
    };

    loadSales();
  }, [sales]);

  const showOrders = () => {
    if (sales.length === 0) return <h3>Cliente sem pedidos</h3>;
    return (loading
      ? <div className="loading" />
      : (
        <>
          { sales.map((order) => (
            <div className="order-card-container" key={ order.id }>
              <OrderCard
                orderDetails={ order }
                currentRole="customer"
              />
            </div>
          )) }
        </>

      ));
  };

  return (
    <div>
      <Navbar />
      <div className="page-order-card">
        {showOrders()}
      </div>
    </div>
  );
}
