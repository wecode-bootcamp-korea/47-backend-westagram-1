const postDao = require('../models/postDao')

const createPosts = async (userId, postImage, postText) => {
    const Posting = await postDao.createPosts(
      userId,
      postImage,
      postText
    );

    return Posting
};

const showAllposts = async (req, res) => {
    const showAllposts = await postDao.showAllposts();
    return showAllposts
};

const getPostById = async (userId) => {
    const getPostById = await postDao.getPostById(userId);
    return getPostById
};

const modifyPosts = async (userId, postId, postText) => {
    const modifiedPost = await postDao.modifyPosts(userId, postId, postText);
    return modifiedPost;
};

module.exports = {
    createPosts,
    showAllposts,
    getPostById,
    modifyPosts
}