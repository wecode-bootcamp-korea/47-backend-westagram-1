const userController = require('../controllers/userController');

const validateToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization;
        jwt.verify(token, userController.secretKey)
        next();
    } catch (err) {
        res.status(401).json({message : "Invalid Access Token"})
        next(err);
        
    }
}

module.exports = {
    validateToken
}