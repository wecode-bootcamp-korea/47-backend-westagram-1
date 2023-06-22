const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const {
      name = 'DEF_VAL',
      email,
      profileImage = 'DEF_VAL',
      password,
    } = req.body;
    await userService.signUp(name, email, profileImage, password);
    return res.status(201).json({ message: 'SUCCESS_USER_CREATION' });
  } catch (error) {
    console.error('ERROR_DURING_USER_CREATION: ', error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const passwordMatched = await userService.signIn(email, password);

    if (passwordMatched) {
      return res
        .status(201)
        .json({ message: 'LOGIN_SUCCESS', TOKEN: 'qwyeuiroqywueirohqwuie' });
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  } catch (error) {
    console.error('ERROR_DURING_LOGIN: ', error);
    return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  signUp,
  signIn,
};
