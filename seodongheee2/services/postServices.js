const postDao = require('../models/postDao')

const createPost = async function (title, content, user_id, posting_image_url) {

    const createPosting = await postDao.createPosting(
        title,
        content,
        user_id,
        posting_image_url
    );

    return createPosting;
};
    
const postingData = async function(){
    const postData = await postDao.postdata();
   return postData; 
} ;
 




    module.exports = {
         createPost ,postingData
    }
   