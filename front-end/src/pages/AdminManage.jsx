import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Navbar from '../components/Navbar';
import UserCard from '../components/UserCard';
import UserContext from '../context/UserContext';
import validateEmail from '../helpers/validateEmail';

export default function AdminManage() {
  const [users, setUsers] = useState([]);
  const [loginWarning, setLoginWarning] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');
  const [validRegister, setValidRegister] = useState(false);
  const { user } = useContext(UserContext);

  // Faz GET no back-end para receber lista de usuários e remove o usuário atual
  const loadUsers = async () => {
    try {
      const headers = { headers: { authorization: user.token } };
      const newUsers = await axios.get('http://54.91.209.225:3001/admin', headers);
      const otherUsers = newUsers.data.filter((currUser) => (currUser.id !== user.id));
      setUsers(otherUsers);
    } catch (error) {
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
    }
  };

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
      await axios.post('http://localhost:3001/admin', data, headers);
      clearStates();
      setLoginWarning({ message: 'Usuário cadastrado com sucesso!' });
      loadUsers();
    } catch (error) {
      console.log(error);
      setLoginWarning(error.response.data);
    }
  };

  // Faz DELETE no back-end para remover usuário
  const deleteUser = async (id) => {
    try {
      const headers = { headers: { authorization: user.token } };
      await axios.delete(`http://localhost:3001/admin/${id}`, headers);
      loadUsers();
    } catch (error) {
      console.log(error);
      const unauthorizedCode = 401;
      if (error.response.status === unauthorizedCode) return handleLogout();
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

  // Chama função de carregar usuários quando a página é carregada
  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="admin-page">
      <Navbar />
      <h3>Cadastrar Novo Usuário</h3>
      <p
        className={ `login-error ${!('message' in loginWarning) && 'hidden'}` }
        data-testid="admin_manage__element-invalid-register"
      >
        {loginWarning.message}
      </p>
      <form className="admin-form">

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
          className="btn-cadastrar"
          onClick={ handleRegister }
          disabled={ !validRegister }
        >
          CADASTRAR
        </button>
      </form>
      <div className="admin-users-container">
        {users.length > 0 && users.map((currUser, index) => (
          <UserCard
            userDetails={ currUser }
            key={ currUser.id }
            index={ index }
            deleteUser={ deleteUser }
          />
        ))}
      </div>
    </div>
  );
}
