import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import UserContext from '../context/UserContext';
import motorcycle from '../images/motorcycle.svg';

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
    <>
      <Navbar />

      <div className="customer-product-page">

        <div className="customer-products-container">
          { loading
            ? <div className="loading" />
            : (products.map((product) => (
              <ProductCard
                key={ product.id }
                productDetails={ product }
              />)))}
        </div>
        <div className="cart-btn-container">
          <button
            type="button"
            data-testid="customer_products__button-cart"
            className="cart-btn"
            disabled={ !totalCartValue }
            onClick={ handleCheckout }
          >
            <img src={ motorcycle } alt="carrinho" />
            {!totalCartValue
              ? <p />
              : (
                <p data-testid="customer_products__checkout-bottom-value">
                  {'R$ '}

                  <span>
                    {totalCartValue.toFixed(2).toString().replace('.', ',')}
                  </span>
                </p>)}

          </button>
        </div>
      </div>
    </>
  );
}
