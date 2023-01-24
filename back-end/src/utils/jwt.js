const jwt = require('jsonwebtoken');
const fs = require("fs");

const key_secret = fs.readFileSync('jwt.evaluation.key');

const newToken = (data) => {
  token = jwt.sign({ data }, key_secret, {
      expiresIn: '15d',
      algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
    const validate = jwt.verify(token, key_secret);
    return { type: null, validate };
  } catch (error) {
    return { type: 401, message: { message: 'Token deve ser válido' } };
  }
};

module.exports = {
  newToken,
  validateToken,
}
