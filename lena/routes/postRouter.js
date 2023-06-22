const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

router.post('/new', postController.writePost);
router.get('/all', postController.getAllPosts);
router.get('/user/:userId', postController.getUserPosts);
router.patch('/:postId', postController.updatePost)
router.delete('/:postId', postController.deletePost)
router.post('/:postId/likes', postController.likePost);

module.exports = {
    router
}