const postService = require('../services/postService');

const upload = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    await postService.upload(title, content, userId);
    return res.status(201).json({ message: 'SUCCESS_CREATE_POST' });
  } catch (error) {
    console.error('ERROR_DURING_CREATING_POST: ', error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json({ posts });
  } catch (errorr) {
    console.error('ERROR_DURING_GATHERING_POSTS: ', error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const pickPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInfo = await postService.pickPosts(userId);
    if (userInfo.length === 0) {
      return res.status(404).json({ message: 'USER_NOT_FOUND' });
    }
    const pickedPosts = {
      userId: userInfo[0].userId,
      userProfileImage: userInfo[0].userProfileImage,
      postings: userInfo.map((user) => ({
        postingId: user.postingId,
        postingTitle: user.postingTitle,
        postingContent: user.postingContent,
      })),
    };
    const responseData = {
      data: pickedPosts,
    };
    return res.status(200).json({ data: responseData });
  } catch (error) {
    console.error('ERROR_DURING_PICKING_POST: ', error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const rewritePost = async (req, res) => {
  try {
    const { content, userId, postId } = req.body;
    const rewritedResult = await postService.rewritePost(
      content,
      userId,
      postId
    );
    return res
      .status(200)
      .json({ message: 'POST_REWRITED', data: rewritedResult });
  } catch (error) {
    console.error('ERROR_DURING_REWRITING_POST: ', error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const expurgatePost = async (req, res) => {
  try {
    const { userId, postId } = req.body;
    await postService.expurgatePost(userId, postId);
    return res.status(200).json({ message: 'POST_EXPURGATED' });
  } catch (error) {
    console.error('ERROR_DURING_EXPURGATING_POST: ', error);
    return res.status(err.statusCode || 500).json({ meddage: err.message });
  }
};

module.exports = {
  upload,
  getAllPosts,
  pickPosts,
  rewritePost,
  expurgatePost,
};
