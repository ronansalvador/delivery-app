import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UserContext from '../context/UserContext';
import validateEmail from '../helpers/validateEmail';

export default function Login() {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(false);
  const [loginWarning, setLoginWarning] = useState({});
  const navigate = useNavigate();

  // função que faz a validação dos inputs de email e senha e salva no estado
  const ValidateLogin = () => {
    const validEmail = validateEmail(email);
    const FIVE = 5;

    setValidLogin(validEmail && password.length > FIVE);
  };

  // Faz POST no back-end para validar login, redireciona de acordo com a role ou salva mensagem de erro no estado
  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post('http://localhost:3001/login', data);
      console.log('response', response);
      if ('message' in response) return setLoginWarning(response.data);
      setUser(response.data);
      // Redireciona de acordo com a role
      if (response.data.role === 'customer') return navigate('/customer/products');
      if (response.data.role === 'seller') return navigate('/seller/orders');
      navigate('/admin/manage');
    } catch (error) {
      console.error('Error:', error.message);
      setLoginWarning({ message: error.message });
    }
  };

  // Chama função de validação sempre que o Email ou Senha são alterados
  useEffect(() => {
    ValidateLogin();
  }, [email, password]);

  // criar um handle inpu generico
  return (
    <div>
      <label htmlFor="login_email">
        Login
        <input
          type="text"
          data-testid="common_login__input-email"
          id="login_email"
          placeholder="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
      </label>

      <label htmlFor="login_password">
        Senha
        <input
          type="password"
          data-testid="common_login__input-password"
          id="login_password"
          placeholder="Password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
      </label>

      <button
        type="button"
        disabled={ !validLogin }
        data-testid="common_login__button-login"
        onClick={ handleLogin }
      >
        Login
      </button>

      <button
        type="button"
        data-testid="common_login__button-register"
      >
        <Link
          to="/register"
        >
          Ainda não tenho conta
        </Link>
      </button>

      <p
        className={ `login-error ${!('message' in loginWarning) && 'hidden'}` }
        data-testid="common_login__element-invalid-email"
      >
        {loginWarning.message}
      </p>
    </div>
  );
}
