import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import Navbar from '../components/Navbar';
import CartContext from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function CustomerProducts() {
  const { products, totalCartValue, cart } = useContext(CartContext);
  const navigate = useNavigate();

  // Faz POST no back-end para adicionar compra, redireciona para tela de checkout
  const handleCheckout = async () => {
    // await axios.post('http://localhost:3001/checkout', cart);
    navigate('/customer/checkout');
  };

  return (
    <div>
      <Navbar />
      { products.map((product) => (<ProductCard
        key={ product.id }
        productDetails={ product }
      />)) }
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
