import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import UserContext from '../context/UserContext';
import validateEmail from '../helpers/validateEmail';

export default function AdminManage() {
  const [name, setName] = useState('Celso Rodrigo');
  const [email, setEmail] = useState('exemplo@email.com');
  const [password, setPassword] = useState('123456');
  const [role, setRole] = useState('seller');
  const [validRegister, setValidRegister] = useState(false);
  const { user } = useContext(UserContext);

  // Limpa os campos de Nome, Email e Senha
  const clearStates = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  // Faz POST no back-end para cadastrar usuário
  const handleRegister = async () => {
    const data = { name, email, password, role };
    try {
      const headers = { headers: { authorization: user.token } };
      await axios.post('http://localhost:3001/register/admin', data, headers);
      clearStates();
      console.log('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.log(error);
      console.error(error?.response.data);
    }
  };

  // Valida os camois
  const ValidateRegister = () => {
    const validEmail = validateEmail(email);
    const FIVE = 5;
    const ELEVEN = 11;

    setValidRegister(validEmail && password.length > FIVE && name.length > ELEVEN);
  };

  // Chama função de validação sempre que o Nome, Role, Email ou Senha são alterados
  useEffect(() => {
    ValidateRegister();
  }, [name, email, password, role]);

  return (
    <div>
      <Navbar />
      <form>
        <h2>Cadastrar Novo Usuário</h2>

        <label htmlFor="admin_name">
          Nome
          <input
            type="text"
            id="admin_name"
            placeholder="Nome e sobrenome"
            data-testid="admin_manage__input-name"
            value={ name }
            onChange={ ({ target }) => setName(target.value) }
          />
        </label>

        <label htmlFor="admin_email">
          Email
          <input
            type="email"
            id="admin_email"
            placeholder="seu-email@site.com"
            data-testid="admin_manage__input-email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </label>

        <label htmlFor="admin_password">
          Senha
          <input
            type="password"
            id="admin_password"
            placeholder="********"
            data-testid="admin_manage__input-password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </label>

        <label htmlFor="admin-role">
          Tipo
          <select
            id="admin-role"
            value={ role }
            onChange={ ({ target }) => setRole(target.value) }
            data-testid="admin_manage__select-role"
          >
            <option value="seller">Vendedor</option>
            <option value="administrator">Administrador</option>
            <option value="customer">Consumidor</option>
          </select>
        </label>

        <button
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ handleRegister }
          disabled={ !validRegister }
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
