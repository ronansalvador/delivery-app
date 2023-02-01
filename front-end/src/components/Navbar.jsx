import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import NavCustomerProducts from './NavCustomerProducts';
import NavSellerOrder from './NavSellerOrder';
import NavAdminManage from './NavAdminManage';

export default function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const { role, name } = user;

  return (
    <nav className="navbar">
      {role === 'customer' && <NavCustomerProducts />}
      {role === 'seller' && <NavSellerOrder />}
      {role === 'administrator' && <NavAdminManage />}
      <p
        className="navbar-name"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        {`${name}`}
      </p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        className="navbar-logout"
        onClick={ handleLogout }
      >
        Sair
      </button>

    </nav>
  );
}
