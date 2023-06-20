const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');

router.post('', postController.createPost);
router.get('/list', postController.getPostlist);

module.exports = {
  router,
};
