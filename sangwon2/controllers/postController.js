const postService = require('../services/postService');

const createPosts = async (req, res) => {
    try {
      const { userId, postImage, postText } = req.body;
      await postService.createPosts(userId, postImage, postText);
      return res.status(201).json({ message: "Created" });
    } 
    catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

const showAllposts = async (req, res) => {
    try {
      const result = await postService.showAllposts();
      return res.status(200).json({ data: result });
    } 
    catch (err) {
      console.log(err);
      return res.status(err.statusCode || 500).json({ message: err.message });
    }
  };

const getUserPosts = async (req, res) => {
    try {
        const userId = req.params.userId;
        const result = await postService.getUserPosts(userId);
        return res.status(200).json({message : "ExtractDataSuccess", userId, data: result});} 

    catch (error) {
        console.error(error);
        res.status(400).json({ message: "400_BAD_REQUEST" });            
        }
    };

const modifyPosts = async (req, res) => {
    try{
      const {userId, postId, postText} = req.body;
      const result = await postService.modifyPosts(userId, postId, postText);
        return res.status(200).json({message : "ModifyPosts", postId, data: result})}
    catch (error) {
        console.error(error);
        res.status(400).json({ message: "400_BAD_REQUEST" });        
    }    
}


module.exports = {
    createPosts,
    showAllposts,
    getUserPosts,
    modifyPosts
};