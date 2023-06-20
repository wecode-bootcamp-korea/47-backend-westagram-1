const postDao = require("../models/postDao");

const creatingPost = async (title, content, user_id) => {
  const createPost = await postDao.upload(title, content, user_id);
  return createPost;
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

module.exports = {
  creatingPost,
  getAllPosts,
  pickPosts,
};
