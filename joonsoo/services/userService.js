const userDao = require('../models/userDao');
const bcrypt = require('bcrypt');

const signUp = async (name, email, profileImage, password) => {
  const saltRounds = 12;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const signUpUser = await userDao.signUp(
    name,
    email,
    profileImage,
    hashedPassword
  );
  return signUpUser;
};

const signIn = async (email, password) => {
  try {
    const userPassword = await userDao.signIn(email);
    if (Array.isArray(userPassword) && userPassword.length === 0) {
      throw new Error('NO_USER_FOUND');
    } else {
      const passwordMatch = await bcrypt.compare(
        password,
        userPassword[0].password
      );
      return passwordMatch;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
};

module.exports = {
  signUp,
  signIn,
};
