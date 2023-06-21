const userDao = require('../models/userDao');

const signUp = async (name, email, profileImage, password) => {
  const signUp = await userDao.signUp(name, email, profileImage, password);
  return signUp;
};

module.exports = {
  signUp,
};
