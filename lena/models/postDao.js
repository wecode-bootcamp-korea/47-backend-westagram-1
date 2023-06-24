const dataSource = require('./dataSource');

const createPost = async (title, content, userId) => {
  try {
    return await dataSource.appDataSource.query(
        `INSERT INTO posts (
            title,
            content,
            user_id
        ) VALUES (?, ?, ?);
        `,
        [title, content, userId]
    );
} catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
}}



const allPosts = async () => {
  try {
    return await dataSource.appDataSource.query(
      `
      SELECT 
      users.id as userId,
      profile_image as userProfileImage,
      posts.id as postingId,
      posts.content as postingContent
      FROM users
      INNER JOIN posts on users.id = posts.user_id
      `
    );
} catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
}}


const userPosts = async(userId) => {
  try {
    const inner = await dataSource.appDataSource.query(
          
      `SELECT 
       users.id as userId,
       users.profile_image as userProfileImage,
       posts.id as postingId,
       posts.content as postingContent
       FROM users
       INNER JOIN posts on posts.user_id = users.id
       WHERE users.id = ?`, [userId])

     const outer = {
         userId : inner[0].userId,
         userProfileImage : inner[0].userProfileImage,
         postings: inner.map((p) => ({
             postingId : p.postingId,
             postingTitle : p.postingTitle,
             postingContent: p.postingContent
         }))}
     return outer;

  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
  }}

  const updatedPost = async (postId, content) => {
    try {
        await dataSource.appDataSource.query(
            `UPDATE posts
            SET posts.content = ?
            WHERE posts.id = ?`,
            [content, postId]
        )
  
        const newPost = await dataSource.appDataSource.query(
            `SELECT 
            users.id as userId,
            users.name as userName,
            posts.id as postingId,
            posts.title as postingTitle,
            posts.content as postingContent
            FROM users
            INNER JOIN posts on posts.user_id = users.id
            WHERE posts.id = ?`, 
            [postId]
        )

        return newPost;

      } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 400;
        throw error;
      }
    }

const deletedPost = async (postId) => {
  try {
    return await dataSource.appDataSource.query(
      `DELETE FROM posts
      WHERE posts.id = ?`,
      [postId]
      );
} catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
}}

const likedPost = async (postId, userId) => {
  try {
    return await dataSource.appDataSource.query(
        `INSERT INTO likes (
            user_id,
            post_id
        ) VALUES (?, ?)`,
        [userId, postId]
        )

} catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 400;
    throw error;
}}

  module.exports = {
    createPost,
    allPosts,
    userPosts,
    updatedPost,
    deletedPost,
    likedPost
  }