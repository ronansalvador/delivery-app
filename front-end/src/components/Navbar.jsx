import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import NavCustomerProducts from './NavCustomerProducts';
import NavSellerOrder from './NavSellerOrder';

export default function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const { role, name } = user;

  return (
    <nav>
      {role === 'customer' && <NavCustomerProducts />}
      {role === 'seller' && <NavSellerOrder />}
      {/* {role === 'admin' && <NavAdminManage />} */}
      <p data-testid="customer_products__element-navbar-user-full-name">{`${name}`}</p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ handleLogout }
      >
        Sair
      </button>

    </nav>
  );
}
