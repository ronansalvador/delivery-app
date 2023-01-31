import React, { useState } from 'react';

export default function AdminManage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('seller');

  return (
    <div>
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
          </select>
        </label>

        <button
          type="button"
          data-testid="admin_manage__button-register"
          onClick={ () => console.log('WIP') }
        >
          CADASTRAR
        </button>
      </form>
    </div>
  );
}
