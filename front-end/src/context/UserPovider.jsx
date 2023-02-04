import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import UserContext from './UserContext';

function UserProvider({ children }) {
  // Busca usuário no localstorage e salva no estado
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser);
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [sellers, setSellers] = useState([]);

  // Limpa o estado, localstorage e redireciona o usuário para tela de login
  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('cart');
    setUser(null);
  };

  // Faz GET no back-end para receber lista de vendas referentes ao usuário e salva no estado
  const getSales = async () => {
    if (user === null || user.role === 'administrator') return;
    try {
      const headers = { headers: { authorization: user.token } };
      const response = await axios.get(`https://important-sink-production.up.railway.app/sales/${user.role}/${user.id}`, headers);
      setSales(response.data);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };
  useEffect(() => {
    getSales();
  }, [user]);

  // Faz GET no back-end para receber lista de pessoas vendedoras e salva no estado
  useEffect(() => {
    const getSellers = async () => {
      if (user?.role !== 'customer') return;
      try {
        const headers = { headers: { authorization: user.token } };
        const allSellers = await axios.get('https://important-sink-production.up.railway.app/seller', headers);
        setSellers(allSellers.data);
      } catch (error) {
        const unauthorizedCode = 401;
        console.log(error);
        if (error.response.status === unauthorizedCode) return handleLogout();
      }
    };

    getSellers();
  }, [user]);

  // Faz GET no back-end para receber produtos
  useEffect(() => {
    const getAllProducts = async () => {
      if (user?.role !== 'customer') return;
      try {
        const headers = { headers: { authorization: user.token } };
        const allProducts = await axios.get('https://important-sink-production.up.railway.app/products', headers);
        setProducts(allProducts.data);
      } catch (error) {
        const unauthorizedCode = 401;
        if (error.response.status === unauthorizedCode) return handleLogout();
      }
    };

    getAllProducts();
  }, [user]);

  const contextValue = React.useMemo(() => ({
    user,
    sales,
    sellers,
    products,
    setSellers,
    setUser,
    handleLogout,
    setSales,
    getSales,
  }), [user, sales, sellers, products]);

  return (
    <UserContext.Provider
      value={ contextValue }
    >
      {children}
    </UserContext.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default UserProvider;
