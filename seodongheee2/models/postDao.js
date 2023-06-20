const { appDataSource } = require('./dataSource');

const createPosting = async (title, content, userId, postingImageUrl) => {
  try {
    return await appDataSource.query(
      `
           INSERT INTO posts (
              title,
              content,
              user_id AS userId ,
              posting_image_url AS postingImageUrl
              ) VALUES (
              ?,?,?,?
             )
             `,
      [title, content, userId, postingImageUrl]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const getAllPost = async function () {
  return await appDataSource.query(
    `
          SELECT
            users.id AS userId,
            users.profileImage AS userProfileImage,  
            posts.id AS postingId,
            posts.postingImageUrl AS PostingImageUrl,
            posts.content AS PostingContent
          FROM
            users,posts
          WHERE
            users.id = posts.id
          `
  );
};

module.exports = {
  createPosting,
  getAllPost,
};
