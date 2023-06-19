const postService = require('../services/postServices');

const createPost = async (req, res) => {
  try {
    const { title, content,user_id,posting_image_url } = req.body;

    if ( !title || !user_id ) {
      return res.status(400).json({ message: 'Please Check Your Post' });
    }

    await postService.createPost( title, content,user_id,posting_image_url );
    return res.status(201).json({
      message: 'POSTING CREATED_SUCCESS',
    });
  } catch (err) {
    console.log(err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
};

const postingData = async function(req,res) {
    const postingD = await postService.postingData();
    return res.status(200).json({ data: postingD});
}

module.exports = {
	createPost,postingData
}

