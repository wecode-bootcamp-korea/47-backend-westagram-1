const postService = require('../services/postServices');

const createPost = async (req, res) => {
  try {
    const { title, content, userId, postingImageUrl } = req.body;

    if (!title || !userId) {
      return res.status(400).json({ message: 'Please Check Your Post' });
    }

    await postService.createPost(title, content, userId, postingImageUrl);
    return res.status(201).json({
      message: 'POSTING CREATED_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getPostlist = async function (req, res) {
  const postList = await postService.postingData();
  return res.status(200).json({ data: postList });
};

module.exports = {
  createPost,
  getPostlist,
};
