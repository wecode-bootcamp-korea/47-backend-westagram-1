const postService = require('../services/postService');

const writePost = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if ( !title || !content || !userId ) {
      return res.status(400).json({ message: 'KEY_ERROR' });
    }

    await postService.writePost( title, content, userId  );
    
    return res.status(201).json({
      message: 'postCreated',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {

    const posts = await postService.getAllPosts();
    
    return res.status(200).json({"data": posts});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};
    

const getUserPosts = async (req, res) => {
  try {

    const userId = req.params.userId;

    const posts = await postService.getUserPosts(userId);
    
    return res.status(200).json({"data": posts});
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};


const updatePost = async (req, res) => {
  try {

    const postId = req.params.postId;
    const {content} = req.body;

    const updated = await postService.updatePost(postId, content);
    
    return res.status(201).json({"data": updated
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};


const deletePost = async (req, res) => {
  try {

    const postId = req.params.postId;

    await postService.deletePost(postId);

    return res.status(200).json({
      message: 'postDeleted',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};


const likePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const {userId} = req.body;

    await postService.likePost(postId, userId);

    return res.status(201).json({
      message: 'likeCreated',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 400).json({ message: err.message });
  }
};

module.exports = {
  writePost,
  getAllPosts,
  getUserPosts,
  updatePost,
  deletePost,
  likePost
}