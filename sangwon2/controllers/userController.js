const userService = require('../services/userService');

const signUp =  async (req, res) => {
    try {
        const {name, email, profileImage, passWord, phoneNumber} = req.body;

        if ( !name || !email || !profileImage || !passWord || !phoneNumber) {
            return res.status(400).json({ message : "Sign_Up_Error"});
        }

        await userService.signUp(name, email, profileImage, passWord, phoneNumber);
        return res.status(201).json({ message: "Welcome"});
    } 
    catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({ message: err.message});
    };
};

module.exports = {
    signUp
};