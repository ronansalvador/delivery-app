import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import NavCustomerProducts from './NavCustomerProducts';

export default function Navbar() {
  const { user } = useContext(UserContext);
  const { role, name } = user;
  console.log(role);

  const HandleLogout = () => {
    console.log('sair');
  };
  return (
    <nav>
      {role === 'customer' && <NavCustomerProducts />}
      {/* {role === 'seller' && <NavSellerOrder />} */}
      {/* {role === 'admin' && <NavAdminManage />} */}
      <p data-testid="customer_products__element-navbar-user-full-name">{`${name}`}</p>
      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ HandleLogout }
      >
        Sair
      </button>

    </nav>
  );
}
