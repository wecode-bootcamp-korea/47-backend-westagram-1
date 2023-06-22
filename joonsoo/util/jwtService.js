const jwt = require('jsonwebtoken');

const generateToken = (email, password) => {
  const payload = {
    email,
    password,
  };
  const token = jwt.sign(payload, 'qweqwe123123', { expiresIn: '1h' });
  return token;
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'qweqwe123123');
    return decoded;
  } catch {
    throw new Error('INVALID_TOKEN');
  }
};

module.exports = {
  generateToken,
  verifyToken,
};
