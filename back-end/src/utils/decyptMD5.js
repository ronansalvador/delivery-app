const crypto = require('crypto');

// Função que desencripta senha do banco de dados.
const compareHash = (password, originalHash) => {
  const newHash = crypto.createHash('md5').update(password).digest('hex');
  // Retorna true ou false.
  return newHash === originalHash;
};
module.exports = { compareHash };
