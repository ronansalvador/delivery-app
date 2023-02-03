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

  return (
    <div>
      <Navbar />
      <div className="page-order-card">
        {loading
          ? <h1>Loading...</h1>
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

          )}
      </div>
    </div>
  );
}
