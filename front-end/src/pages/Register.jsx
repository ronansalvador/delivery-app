import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import validateEmail from '../helpers/validateEmail';
import saveLocalStorage from '../helpers/saveLocalStorage';

export default function Register() {
  const { setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(false);
  const [loginWarning, setLoginWarning] = useState({});
  const navigate = useNavigate();

  // função que faz a validação dos inputs de name, email e senha e salva no estado
  const ValidateLogin = () => {
    const validEmail = validateEmail(email);
    const FIVE = 5;
    const ELEVEN = 11;

    setValidLogin(name.length > ELEVEN && validEmail && password.length > FIVE);
  };

  // Faz POST no back-end para validar registro, efetua login e redireciona ou salva mensagem de erro no estado
  const handleRegister = async () => {
    const data = { name, email, password, role: 'customer' };
    try {
      const response = await axios.post('http://localhost:3001/register', data);
      if ('message' in response) return setLoginWarning(response.data);
      setUser(response.data);
      // Após cadastro o usuário faz login automático e é redirecionado
      saveLocalStorage('user', response.data);
      navigate('/customer/products');
    } catch (error) {
      console.error('Error:', error.message);
      setLoginWarning({ message: error.message });
    }
  };

  // Chama função de validação sempre que o name, Email ou Senha são alterados
  useEffect(() => {
    ValidateLogin();
  }, [name, email, password]);

  return (
    <div>
      <h1>Cadastro</h1>
      <form>
        <label htmlFor="register_name">
          <input
            type="text"
            data-testid="common_register__input-name"
            id="register_name"
            placeholder="Seu nome"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label htmlFor="register_email">
          <input
            type="text"
            data-testid="common_register__input-email"
            id="register_email"
            placeholder="seu-email@site.com"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="register_password">
          <input
            type="password"
            data-testid="common_register__input-password"
            id="register_password"
            placeholder="********"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <button
          type="button"
          disabled={ !validLogin }
          data-testid="common_register__button-register"
          onClick={ handleRegister }
        >
          CADASTRAR
        </button>

        <p
          className={ `login-error ${!('message' in loginWarning) && 'hidden'}` }
          data-testid="common_register__element-invalid_register"
        >
          {loginWarning.message}
        </p>
      </form>
    </div>
  );
}
