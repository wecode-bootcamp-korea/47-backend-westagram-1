const { myDataSource } = require("./dataSource");

const upload = async (title, content, user_id) => {
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
    [title, content, user_id]
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
    console.error("ERROR_FAILED_TO_PICK_POSTS: ", error);
    // return res.status(error.statusCode || 500).json({ message: error.message });
  }
};

module.exports = {
  upload,
  getAllPosts,
  pickPosts,
};
