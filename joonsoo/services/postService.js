const postDao = require('../models/postDao');

const upload = async (title, content, userId) => {
  const upload = await postDao.upload(title, content, userId);
  return upload;
};

const getAllPosts = async function () {
  //함수선언을 안함.
  // console.log(postDao.getAllPosts.data);
  return await postDao.getAllPosts(); //변수형태로 입력함.
};

const pickPosts = async function (userId) {
  // console.log(postDao.pickPosts(userId));
  const pickPosts = await postDao.pickPosts(userId);
  return pickPosts;
};

const rewritePost = async function (content, userId, postId) {
  const rewritePost = await postDao.rewritePost(content, userId, postId);
  return rewritePost;
};

const expurgatePost = async function (userId, postId) {
  const expurgatePost = await postDao.expurgatePost(userId, postId);
  return expurgatePost;
};

module.exports = {
  upload,
  getAllPosts,
  pickPosts,
  rewritePost,
  expurgatePost,
};
