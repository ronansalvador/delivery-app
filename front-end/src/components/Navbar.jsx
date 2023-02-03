import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import NavCustomerProducts from './NavCustomerProducts';
import NavSellerOrder from './NavSellerOrder';
import NavAdminManage from './NavAdminManage';
// import logo from '../images/logo.svg';

export default function Navbar() {
  const { user, handleLogout } = useContext(UserContext);
  const { role, name } = user;

  return (
    <nav className="navbar">
      <p>Sips & Sips</p>
      {/* <img src={ logo } alt="logo" className="navbar-logo" /> */}
      <div className="navbar-buttons">

        <p
          className="navbar-name"
          data-testid="customer_products__element-navbar-user-full-name"
        >
          {`${name}`}
        </p>
        {role === 'customer' && <NavCustomerProducts />}
        {role === 'seller' && <NavSellerOrder />}
        {role === 'administrator' && <NavAdminManage />}

        <button
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          className="navbar-logout"
          onClick={ handleLogout }
        >
          Sair
        </button>
      </div>

    </nav>
  );
}
