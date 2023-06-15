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
        console.log("Data Source has been initialized!");
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    })

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function (req, res)  {
  res.json({ message : 'pong' });
});



app.post('/users', async function (req, res) {
   const { name,email,profile_image, password } = req.body;
   
   await appDataSource.query(
      `
      INSERT INTO users (
        name,
        email,
        profile_image,
        password
      ) VALUES (
        ?,?,?,?
      )
    `,
    [name, email,profile_image,password])
    
     res.status(201).json({ message: 'sign -up welcome!' });
      });



app.post('/posts', async function (req, res) {
        console.log(req.body);
        const { title,content,user_id,posting_image_url} = req.body;
        
      const posts = await appDataSource.query(
           `
         INSERT INTO posts (
         title,
         content,
         user_id,
         posting_image_url
         ) VALUES (
         ?,?,?,?
           )
         `,
       [title, content,user_id,posting_image_url]);
         
       res.json({ message: 'Created Your Post!!' });
       });

  app.get('/postdata', async function (req, res) {
      const postdata = await appDataSource.query(
              `
              SELECT
              users.id AS userId,
              users.profile_image AS userProfileImage,
              posts.id AS postingId,
              posts.posting_image_url AS PostingImageUrl,
              posts.content AS PostingContent
              FROM
              users, posts
              WHERE
              users.id = posts.id
            `);
            res.status(200).json({ data: postdata});
          });


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
