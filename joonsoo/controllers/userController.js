// const { myDataSource } = require('../models/dataSource');
const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password } = req.body;
    await userService.signUp(name, email, profileImage, password);
    return res.status(201).json({ message: 'SUCCESS_USER_CREATION' });
  } catch (error) {
    console.error('ERROR_DURING_USER_CREATION: ', error);
    return res.status(err.statusCode || 500).json({ message: err.message });

    //   const { name, email, password, profileImage } = req.body;

    //   // if (!name || !email || !password || !profileImage) {
    //   //   return res.status(400).json({ message: "KEY_ERROR" });
    //   // }

    //   await userService.signUp(name, email, password, profileImage);
    //   return res.status(201).json({ message: 'SIGNUP_SUCCESS' });
    // } catch (error) {
    //   console.error('ERROR_DURING_USERCREATION');
    //   return res.status(500).json({ message: '실패!!!!' });
  }
};

module.exports = {
  signUp,
};
