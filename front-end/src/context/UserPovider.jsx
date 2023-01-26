import React, { useState } from 'react';
import PropTypes from 'prop-types';
import UserContext from './UserContext';

function UserProvider({ children }) {
  // Busca usuário no localstorage e salva no estado
  const savedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(savedUser);

  // Limpa o estado, localstorage e redireciona o usuário para tela de login
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const contextValue = React.useMemo(() => ({
    user, setUser, handleLogout,
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
