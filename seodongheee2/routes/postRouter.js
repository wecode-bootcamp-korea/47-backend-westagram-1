const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');



router.post('/posting',postController.createPost);
router.get('/postdata',postController.postingData);

module.exports = {
	router
}