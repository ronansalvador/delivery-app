import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import UserContext from '../context/UserContext';
import NavCustomerProducts from './NavCustomerProducts';

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const { role, name } = user;
  const navigate = useNavigate();

  const HandleLogout = () => {
    localStorage.removeItem('user');
    setUser({});
    navigate('/');
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
