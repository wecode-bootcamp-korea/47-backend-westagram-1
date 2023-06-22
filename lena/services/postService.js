const postDao = require('../models/postDao')

const writePost = async (title, content, userId) => {

    const createPost = await postDao.createPost(
      title, 
      content,
      userId
    );
    
      return createPost;
    };
  
const getAllPosts = async () => {

  const allPosts = await postDao.allPosts();
  
    return allPosts;
  };

  
const getUserPosts = async (userId) => {
  const userPosts = await postDao.userPosts(userId);

  return userPosts

}

const updatePost = async (postId, content) => {

  const updatedPost = await postDao.updatedPost(
    postId,
    content
  );
    return updatedPost;
  };


const deletePost = async (postId) => {

  const deletedPost = await postDao.deletedPost(postId
  );
    return deletedPost;
  };

const likePost = async (postId, userId) => {

  const likedPost = await postDao.likedPost(postId, userId
  );
    return likedPost;
  };







module.exports = {
    writePost,
    getAllPosts,
    getUserPosts,
    updatePost,
    deletePost,
    likePost
}