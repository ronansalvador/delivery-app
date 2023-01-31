import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import CartContext from '../context/CartContext';
import saveLocalStorage from '../helpers/saveLocalStorage';

export default function CheckoutItem(props) {
  const { itemDetails: { id, name, quantity, price }, index, pageTestId } = props;
  const { cart, setCart } = useContext(CartContext);

  // Remove item do estado do carrinho e da chave cart do localstorage
  const removeItem = () => {
    const oldCart = cart;
    const newCart = oldCart.filter((product) => product.id !== id);
    setCart(newCart);
    saveLocalStorage('cart', newCart);
  };

  return (
    <div>
      <p
        data-testid={ `${pageTestId}__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </p>
      <p
        data-testid={ `${pageTestId}__element-order-table-name-${index}` }
      >
        {name}
      </p>
      <p
        data-testid={ `${pageTestId}__element-order-table-quantity-${index}` }
      >
        {quantity}
      </p>
      <p>
        {'R$ '}
        <span
          data-testid={
            `${pageTestId}__element-order-table-unit-price-${index}`
          }
        >
          {Number(price).toFixed(2).replace('.', ',')}
        </span>
      </p>
      <p>
        {'R$ '}
        <span
          data-testid={ `${pageTestId}__element-order-table-sub-total-${index}` }
        >
          {(Number(price) * quantity).toFixed(2).replace('.', ',')}
        </span>
      </p>
      { pageTestId === 'customer_checkout' && (
        <button
          type="button"
          data-testid={ `${pageTestId}__element-order-table-remove-${index}` }
          onClick={ removeItem }
        >
          Remover
        </button>
      )}
    </div>
  );
}

CheckoutItem.propTypes = {
  itemDetails: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    quantity: PropTypes.number,
  }).isRequired,
  index: PropTypes.number.isRequired,
  pageTestId: PropTypes.string.isRequired,
};
