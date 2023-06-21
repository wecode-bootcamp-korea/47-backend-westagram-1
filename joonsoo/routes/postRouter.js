const express = require('express');
const router = express.Router();

const postController = require('../controllers/postController');

router.post('/upload', postController.upload); //
router.get('/getAllPosts', postController.getAllPosts); //
router.get('/pickPosts/:userId', postController.pickPosts); //
router.patch('/rewritePost', postController.rewritePost); //
router.delete('/expurgatePost', postController.expurgatePost);

module.exports = {
  router,
};
