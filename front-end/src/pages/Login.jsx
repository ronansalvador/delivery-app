import React, { useContext } from 'react';
import UserContext from '../context/UserContext';

export default function Login() {
  const { theme, changeTheme } = useContext(UserContext);
  return (
    <button type="button" className={ `${theme}` } onClick={ changeTheme }>Login</button>
  );
}
