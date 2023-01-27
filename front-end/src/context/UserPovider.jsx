import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// import axios from 'axios';
import UserContext from './UserContext';

function UserProvider({ children }) {
  // Busca usuário no localstorage e salva no estado
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser);
  const [sales, setSales] = useState([]);

  // Limpa o estado, localstorage e redireciona o usuário para tela de login
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  // Faz GET no back-end para receber lista de vendas referentes ao usuário e salva no estado
  // WORK IN PROGRESS
  useEffect(() => {
    const getSales = async () => {
      if (user === null) return;
      try {
        // const headers = { headers: { authorization: user.token } };
        // const response = await axios.get(`http://localhost:3001/sales/${user.id}`, headers);
        // setSales(response.data);
      } catch (error) {
        const unauthorizedCode = 401;
        if (error.response.status === unauthorizedCode) return handleLogout();
      }
    };

    getSales();
  }, [user]);

  const contextValue = React.useMemo(() => ({
    user, sales, setUser, handleLogout, setSales,
  }), [user]);

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
