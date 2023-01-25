import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import UserContext from '../context/UserContext';

export default function CustomerProducts() {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { products, setProducts, totalCartValue } = useContext(CartContext);
  const navigate = useNavigate();

  // Faz POST no back-end para adicionar compra, redireciona para tela de checkout
  const handleCheckout = async () => {
    navigate('/customer/checkout');
  };

  // Faz GET no back-end para receber produtos
  useEffect(() => {
    const getAllProducts = async () => {
      const headers = { headers: { authorization: user.token } };
      const allProducts = await axios.get('http://localhost:3001/products', headers);
      setProducts(allProducts.data);
      setLoading(false);
    };

    getAllProducts();
  }, [user]);

  return (
    <div>
      <Navbar />
      { loading
        ? <h1>Loading...</h1>
        : (products.map((product) => (
          <ProductCard
            key={ product.id }
            productDetails={ product }
          />)))}

      <button
        type="button"
        data-testid="customer_products__button-cart"
        className="cart-btn"
        disabled={ !totalCartValue }
        onClick={ handleCheckout }
      >
        {!totalCartValue
          ? <p>Carrinho vazio</p>
          : (
            <p data-testid="customer_products__checkout-bottom-value">
              Ver carrinho: R$
              <span>
                {totalCartValue.toFixed(2).toString().replace('.', ',')}
              </span>
            </p>)}

      </button>
    </div>
  );
}
