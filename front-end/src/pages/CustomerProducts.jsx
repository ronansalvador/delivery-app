import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import UserContext from '../context/UserContext';

export default function CustomerProducts() {
  const [loading, setLoading] = useState(true);
  const { products } = useContext(UserContext);
  const { totalCartValue } = useContext(CartContext);
  const navigate = useNavigate();

  // Faz POST no back-end para adicionar compra, redireciona para tela de checkout
  const handleCheckout = async () => {
    navigate('/customer/checkout');
  };

  // Fica em estado de loading até a lista de produtos vir da requisição feita no UserProvider
  useEffect(() => {
    const getAllProducts = async () => {
      if (products.length) setLoading(false);
    };

    getAllProducts();
  }, [products]);

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
