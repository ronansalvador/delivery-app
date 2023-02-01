const jwt = require('jsonwebtoken');
const fs = require('fs');

const keySecret = fs.readFileSync('jwt.evaluation.key');

const newToken = (data) => {
  const token = jwt.sign({ data }, keySecret, {
      expiresIn: '7d',
      algorithm: 'HS256',
  });
  return token;
};

const validateToken = (token) => {
  try {
    const validate = jwt.verify(token, keySecret);
    return { type: null, validate };
  } catch (error) {
    return { type: 401, message: { message: 'Token deve ser válido' } };
  }
};

module.exports = {
  newToken,
  validateToken,
};
