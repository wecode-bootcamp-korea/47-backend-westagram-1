require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { DataSource } = require('typeorm');

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

appDataSource
    .initialize()
    .then(() => {
        console.log('Data Source has been initialized!');
    })
    .catch((err) => {
        console.log("Error during Data Source initialization:", err);
    });

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function (req, res, next) {
  res.json({ message: 'ping' });
});

app.get('/users', async function (req, res, next) {
  const users = await appDataSource.query(
    `
    SELECT
      id,
      email,
      password
    FROM users
  `);
  res.json({ data: users });
});

app.post('/users', async function (req, res) {
  console.log(req.body);
  const { name, email, profile_image, password } = req.body;

  await appDataSource.query(
    `
    INSERT INTO users(
      name,
      email,
      profile_image,
      password
    ) VALUES (
      ?,
      ?,
      ?,
      ?
    )
  `,
    [name, email, profile_image, password]
  );
  res.json({ message: 'SUCCESS_CREATE_USER' });
});

app.post('/posts', async function (req, res) {
  console.log(req.body);
  const { title, content, user_id } = req.body;

  await appDataSource.query(
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
  res.json({ message: 'SUCCESS_CREATE_POST' });
});

app.get('/posts', async function (req, res, next) {
  const posts = await appDataSource.query(
    `
    SELECT
      posts.user_id AS userId,
			users.profile_image AS userProfileImage,      
			posts.id AS postingId,
			posts.title AS postingTitle,
			posts.content As postingContent
    FROM posts
		INNER JOIN users ON posts.user_id = users.id
  `);
  res.json({ data: posts });
});

app.get('/users/:userId/posts', async function (req, res, next) {
  const userId = req.params.userId;

  try {
    const users = await appDataSource.query(
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
      
      if (users.length === 0) {
        return res.status(404).json({ message: 'USER_NOT_FOUND' });
      }

      const userData = {
        userId: users[0].userId,
        userProfileImage: users[0].userProfileImage,
        postings: users.map((user) => ({
          postingId: user.postingId,
          postingTitle: user.postingTitle,
          postingContent: user.postingContent
        }))
      };
  
      const responseData = {
        data: userData
      };
  
      res.json(responseData);
    } catch (error) {
      console.error('Error retrieving user posts:', error);
      res.status(500).json({ message: 'FAILED_GET_USER_POSTS' });
    }
  });

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});