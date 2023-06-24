const express = require('express');
const auth = require("../middlewares/auth")
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/new', auth.validateToken, postController.writePost);
router.get('/all', postController.getAllPosts);
router.get('/user/:userId', postController.getUserPosts);
router.patch('/:postId', auth.validateToken, postController.updatePost)
router.delete('/:postId', auth.validateToken, postController.deletePost)
router.post('/:postId/likes', auth.validateToken, postController.likePost);

module.exports = {
    router
}