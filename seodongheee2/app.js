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


app.post('/users/signup', async function (req, res) {
   const { name,email,profile_image, password } = req.body;

  if (!name || !email|| !password)
  return res.status(400).json({message: 'key_error'});
   
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
       const { title,content,user_id,posting_image_url} = req.body;
        if (!title || !user_id) 
        return res.status(400).json({message:'cannot creat your post'});

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


app.get('/users/posts/:userId', async function (req, res) {
 //GET http:''127.0.0.1:3000/users/posts?userId=1      
  const userId = req.params.userId;
  const userInfo = await appDataSource.query(
          `
          SELECT
                users.id AS userId,
                users.profile_image AS userProfileImage,
                JSON_ARRAYAGG(
                 JSON_OBJECT( 
                 "postingId", posts.id,
                 "PostingImageUrl", posts.posting_image_url,
                 "PostingContent", posts.content
                 ) 
                 )AS postings
          FROM users 
          JOIN posts ON users.id = posts.user_id
          WHERE users.id =?
          `,
          [userId]
  );
            res.status(200).json({"data" : userInfo});
          });


        
          