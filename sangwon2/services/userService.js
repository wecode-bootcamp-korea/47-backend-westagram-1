const userDao = require('../models/userDao')
const bcrypt = require('bcrypt')

const signUp = async (name, email, profileImage, passWord, phoneNumber) => {
    const pwValidation = new RegExp(
        '^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]{8,20}'
    );
    const saltRounds = 12;

    if (!pwValidation.test(passWord)) {
        const err = new Error('CHECK_PASSWORD');
        err.statusCode = 400;
        throw err;
    }

    const hashedPassword = await bcrypt.hash(passWord, saltRounds);
    const createUser = await userDao.createUser(
        name,
        email,
        profileImage,
        hashedPassword,
        phoneNumber
    );

    return createUser
};

module.exports = {
    signUp
}