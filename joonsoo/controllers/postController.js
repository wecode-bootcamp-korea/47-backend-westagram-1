const postService = require("../services/postService");

const creatingPost = async (req, res) => {
  try {
    const { title, content, user_id } = req.body;

    await postService.dataS(title, content, user_id);
    return res.status(201).json({
      message: "SUCCESS_CREATE_POST",
    });
  } catch (error) {
    console.error("ERROR_DURING_CREATING_POST: ", error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const getAllPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    return res.status(200).json({ posts });
  } catch (errorr) {
    console.error("ERROR_DURING_GATHERING_POSTS: ", error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const pickPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const userInfo = await postService.pickPosts(userId);
    if (userInfo.length === 0) {
      return res.status(404).json({ message: "USER_NOT_FOUND" });
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
    console.error("ERROR_DURING_PICKING_POST: ", error);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

module.exports = {
  creatingPost,
  getAllPosts,
  pickPosts,
};
