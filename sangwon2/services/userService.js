const userDao = require('../models/userDao')

const signUp = async (name, email, profileImage, passWord, phoneNumber) => {
    const pwValidation = new RegExp(
        '^(?=.*[a-z])(?=.*\\d)(?=.*[@$!%*?&])[a-z\\d@$!%*?&]{8,20}'
    );
    if (!pwValidation.test(passWord)) {
        const err = new Error('CHECK_PASSWORD');
        err.statusCode = 400;
        throw err;
    }

    const createUser = await userDao.createUser(
        name,
        email,
        profileImage,
        passWord,
        phoneNumber
    );

    return createUser
};

module.exports = {
    signUp
}