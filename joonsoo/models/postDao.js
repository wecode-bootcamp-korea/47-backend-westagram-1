// const { MetadataAlreadyExistsError } = require('typeorm');
const { myDataSource } = require('./dataSource');

const upload = async (title, content, userId) => {
  await myDataSource.query(
    `
        INSERT INTO posts(
          title,
          content,
          user_id
        ) VALUES (
          ?,
          ?,
          ?
        )
      `,
    [title, content, userId]
  );
};

const getAllPosts = async () => {
  return await myDataSource.query(
    `
    SELECT
      posts.user_id AS userId,
			users.profile_image AS userProfileImage,      
			posts.id AS postingId,
			posts.title AS postingTitle,
			posts.content As postingContent
    FROM posts
		INNER JOIN users ON posts.user_id = users.id
  `
  );
};

const pickPosts = async (userId) => {
  try {
    return await myDataSource.query(
      `
      SELECT
        users.id AS userID,
        users.profile_image AS userProfileImage,
        posts.id AS postingId,
        posts.title AS postingTitle,
        posts.content AS postingContent
      FROM users 
      INNER JOIN posts ON users.id = posts.user_id
      WHERE users.id = ?
      `,
      [userId]
    );
  } catch (error) {
    console.error('ERROR_FAILED_TO_PICK_POSTS: ', error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

const rewritePost = async (content, userId, postId) => {
  try {
    await myDataSource.query(
      `
        UPDATE posts
        SET content = ?
        WHERE user_id = ? AND id = ?
      `,
      [content, userId, postId]
    );

    const rewritedPost = await myDataSource.query(
      `
      SELECT
        users.id AS userId,
        users.name AS userName,
        posts.id AS postingId,
        posts.title AS postingTitle,
        posts.content AS postingContent
      FROM users
      JOIN posts ON users.id = posts.user_id
      WHERE users.id = ? AND posts.id = ?
      `,
      [userId, postId]
    );
    return rewritedPost;
  } catch (error) {
    console.error('ERROR_FAILED_TO_REWRITE_POST: ', error);
  }
};

const expurgatePost = async (userId, postId) => {
  try {
    await myDataSource.query(
      `
      DELETE FROM posts
      WHERE posts.user_id = ? AND posts.id = ?
      `,
      [userId, postId]
    );
  } catch (error) {
    console.error('ERROR_FAILED_TO_EXPURGATE_POST: ', error);
  }
};

module.exports = {
  upload,
  getAllPosts,
  pickPosts,
  rewritePost,
  expurgatePost,
};
