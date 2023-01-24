import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function CustomerProducts() {
  const { products } = useContext(CartContext);
  console.log(products);
  return (
    <div>
      <Navbar />
      { products.map((product) => (<ProductCard
        key={ product.id }
        productDetails={ product }
      />)) }
    </div>
  );
}
