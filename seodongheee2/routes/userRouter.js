const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
//하위 api 인 controller의 usercontroller를 가져옴

//router이라는 객체를 post라는 매소드로 'signup'경로로 갔을때 userController의 signup 함수를 실행하라
router.post('/signup',userController.signUp);
router.get('/personalPost/:userId',userController.personalPostC)


module.exports = {
	router
}