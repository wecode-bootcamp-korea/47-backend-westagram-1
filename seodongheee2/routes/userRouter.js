const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.post('/signup',userController.signUp);
router.get('/personalPost/:userId',userController.personalPostC)


module.exports = {
	router
}