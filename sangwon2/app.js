
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import { DataSource } from 'typeorm';

dotenv.config();

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

appDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(cors());
app.use(logger("combined"));
app.use(express.json());

app.get("/ping", function (req, res, next) {
  res.json({ message: "pong" });
});

app.listen(3000, function () {
  console.log("server listening on port 3000");
});

app.post('/users/signup', async (req, res) => {
  const {name, email, profileImage, password, phoneNumber } = req.body

  await appDataSource.query(
      `INSERT INTO users(
          name,
          email,
          profile_image,
          password,
          phone_number
      ) VALUES ( ?, ?, ?, ?, ?);
      `, [name, email, profileImage, password, phoneNumber]
  );
  res.status(201).json({ message: 'userCreated' });
});

app.post('/users/posts', async (req, res) => {
  const { userId, postImage, postPG } = req.body;

  await appDataSource.query(`
    INSERT INTO posts (
      user_id,
      post_image,
      post_paragraph
    ) VALUES (?, ?, ?);
  `, [userId, postImage, postPG]);

  res.status(201).json({ message: 'postCreated' });
});

app.get('/users/posts', async (req, res) => {
  try {
    const posts = await appDataSource.query(`
      SELECT *
      FROM posts
    `);

    res.status(200).json({ data: posts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '서버 오류났어 ㅠㅠ' });
  }
});

app.get('/users/posts/search', async (req, res) => {
  try {
    const Viewposts = await appDataSource.query(`
      SELECT
        users.id AS userId,
        posts.id AS postingId,
        posts.post_image AS postingImageUrl,
        posts.post_paragraph AS postingContent
      FROM users
        INNER JOIN posts ON posts.user_id = users.id
`);

    res.status(200).json({ data: Viewposts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: '정신차려 상원아' });
  }
});