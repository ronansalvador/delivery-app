import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';

export default function CustomerProducts() {
  const { products } = useContext(CartContext);
  console.log(products);
  return (
    <div>
      <Navbar />
    </div>
  );
}
