const { User } = require('../database/models');
const { compareHash } = require('../utils/decyptMD5');
const { validateLogin } = require('./schemas/validate.input');

const login = async ({ email, password }) => {

  // Valida se o input email e senha é estruturado da forma correta.
  const error = validateLogin(email, password);

  if (error.type) {
    return error
  }
  
  // Busca o compo "email" no banco de dados, retornando o email e tudo que está relacionado a ele.
  const emailValidate = await User.findOne({ where: { email }, raw: true });

  if(!emailValidate){
    return { type: 404, message: { message: 'email ou senha incorretos'} };
  }

  // Hash armazenada no banco de dados.
  const hashOriginal = emailValidate.password

  // Função que compara a senha do input com a original do banco de dados.
  const decrypt = compareHash(password, hashOriginal);
  if(decrypt !== true) {
    return { type: 404, message: { message: 'email ou senha incorretos' } };
  }

  // Retorna as informações informações do usuario, caso o login seja feito com sucesso.
  const { name, role } = emailValidate;
  return { type: 200, message: { name, email, role, token: 'r2398vz239sfa87238s3' } }
};

module.exports = { login };
