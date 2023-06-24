const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const userDao = require('../models/userDao')
const secretKey = crypto.randomBytes(64).toString("hex");

const signUp = async (name, email, profileImage, password) => {
    // password validation using REGEX
    const pwValidation = new RegExp(
      '^(?=.*[A-Za-z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,20})'
    );
    if (!pwValidation.test(password)) {
      const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
    }

      const saltRounds = 12; 
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      console.log(hashedPassword)
      const createUser = await userDao.createUser(
            name, 
            email, 
            profileImage, 
            hashedPassword
        );
      
    return createUser;
    };

const signIn = async(email, password) => {

  const hashedPassword = await userDao.verifyUser(email)
  if (bcrypt.compare(JSON.stringify(password), JSON.stringify(hashedPassword))) {
    const payLoad = { foo: 'bar' }; 
    const jwtToken = jwt.sign(payLoad, secretKey);
    return jwtToken
  }
  else {
    const err = new Error('PASSWORD_IS_NOT_VALID');
      err.statusCode = 409;
      throw err;
  }

};

  module.exports = {
      signUp,
      signIn
  }