import React from 'react';

export default function Register() {
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
            // value={}
            // onChange={}
          />
        </label>

        <label htmlFor="register_email">
          <input
            type="text"
            data-testid="common_register__input-email"
            id="register_email"
            placeholder="seu-email@site.com"
            // value={}
            // onChange={}
          />
        </label>

        <label htmlFor="register_password">
          <input
            type="password"
            data-testid="common_register__input-password"
            id="register_password"
            placeholder="********"
            // value={}
            // onChange={}
          />
        </label>

        <button
          type="button"
          // disabled={}
          data-testid="common_register__button-register"
          // onClick={}
        >
          CADASTRAR
        </button>

        <p
          className={ `register-error ${!('message' in {}) && 'hidden'}` }
          data-testid="common_register__element-invalid_register"
        >
          {}
        </p>
      </form>
    </div>
  );
}
