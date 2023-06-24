const userService = require('../services/userService');

const signUp = async (req, res) => {
  try {
    const { name, email, profileImage, password  } = req.body;

    if ( !name || !email || !password || !profileImage ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email, profileImage, password );

    return res.status(201).json({
      message: 'userCreated',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};


const signIn = async (req, res) => {
  try {
    const { email, password  } = req.body;

    if ( !email || !password ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    const token = await userService.signIn( email, password );

    return res.status(201).json({"accessToken" : token});
    
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
	signUp,
  signIn
}