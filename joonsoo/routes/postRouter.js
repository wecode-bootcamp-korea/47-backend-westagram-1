const express = require("express");
const router = express.Router();

const postController = require("../controllers/postController");

router.post("/upload", postController.creatingPost);
router.get("/getAllPosts", postController.getAllPosts);
router.get("/pickPosts/:userId", postController.pickPosts);

module.exports = {
  router,
};
