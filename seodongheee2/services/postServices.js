const postDao = require('../models/postDao');

const createPost = async function (title, content, userId, postingImageUrl) {
  const createPosting = await postDao.createPosting(
    title,
    content,
    userId,
    postingImageUrl
  );

  return createPosting;
};

const postingData = async function () {
  const postData = await postDao.getAllPost();
  return postData;
};

module.exports = {
  createPost,
  postingData,
};
