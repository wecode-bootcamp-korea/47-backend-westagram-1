const express = require('express');

const postController = require('../controllers/postController');

const router = express.Router();

router.post('/createposts', postController.createPosts);
router.get('/showAllposts', postController.showAllposts);
router.get('/users/:userId', postController.getUserPosts);
router.patch('/:postId', postController.modifyPosts);
//router.delete('/:postId', postController.deletePosts);

module.exports = {router};