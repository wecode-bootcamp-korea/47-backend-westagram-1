const appDataSource = require('./dataSource');

const createPosts = async (userId, postImage, postText) => {
  try {
    return await appDataSource.query(
      `INSERT INTO posts (
          user_id,
          post_image,
          post_paragraph
      ) VALUES (
          ?,
          ?,
          ?
      )`,
      [userId, postImage, postText]
    );
  } catch (err) {
        const error = new Error("INVALID_DATA_INPUT");
        error.statusCode = 500;
    throw error;
  }
};

const showAllposts = async (userId, postImage, postText) => {
    try {
      return await appDataSource.query(`
        SELECT 
            id,
            user_id,
            post_image,
            post_paragraph
        FROM posts
      `);
    } 
    catch (err) {
      const error = new Error("INVALID_DATA");
      error.statusCode = 500;
      throw error;
    }
  };

const getPostById = async (userId) => {
    try {
      const result = await appDataSource.query(
        `
        SELECT
          users.id AS userId,
          users.profile_image AS userProfileImage,
          JSON_ARRAYAGG(
            JSON_OBJECT(
              'postingId', posts.id,
              'postingImageUrl', posts.post_image,
              'postingContent', posts.post_paragraph
            )
          ) AS postings
        FROM users
          INNER JOIN posts ON posts.user_id = users.id
        WHERE
          users.id = ?
        GROUP BY users.id, users.profile_image
      `,
        [userId]
      );

      if (result.length > 0) {
        const firstPost = result[0];
        const { userId, userProfileImage, postings } = firstPost;
        const parsedPostings = JSON.parse(postings);
        return { userId, userProfileImage, postings: parsedPostings };
      } 
      else {
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

const modifyPosts = async (userId, postId, postText) => {
    try {
   
        return appDataSource.query(
            `UPDATE posts
            SET post_paragraph = ?
            WHERE posts.user_id = ? And posts.id = ? 
            `,
            [postText, userId, postId]
        ); 
    }

    catch (error) {
        console.error(error);
        throw error;
    }
};

  module.exports = {
    createPosts,
    showAllposts,
    getPostById,
    modifyPosts
  };