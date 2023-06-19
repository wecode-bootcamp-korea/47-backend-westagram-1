const userService = require('../services/userServices');

const signUp = async (req, res) => {
  try {
    const { name, email, profile_image ,password } = req.body;

    if ( !name || !email || !password ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await userService.signUp( name, email,profile_image,password );
    return res.status(201).json({
      message: 'SIGNUP_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const personalPostC= async function (req,res){
  
  const {userId} = req.params;
  const datelist = await userService.personalPostS(userId);
  
  return res.status(200).json({data : datelist })
 
}

module.exports = {
	signUp,personalPostC
}


