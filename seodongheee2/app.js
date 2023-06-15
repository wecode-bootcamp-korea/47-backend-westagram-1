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
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.get('/ping', function (req, res, next) {
  res.json({ message: 'pong' });
});


// app.get('/postdata', async function (req, res, next) {
//   const postdata = await appDataSource.query(`
//     SELECT 
//     users.id AS userId,
//     users.profile_image AS userProfileImage, 
//     posts.id AS postingId,
//     posts.posting_image_url AS postingImageUrl,
//     posts.content AS PostingContent
//     FROM 
//     users
//     INNER JOIN posts ON users.id = posts.user_id
//   `);
//   res.json({ data: postdata});
// });



app.post('/users', async function (req, res, next) {
 
  const { name,email,profile_image, password } = req.body;
  
    await appDataSource.query(
      `
      INSERT INTO users (
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
    `,[])
})
    

app.post('/posts', async function (req, res) {

  const { title,user_id} = req.body;
  
    await appDataSource.query(
      `
      INSERT INTO posts (
        title,
        user_id
      ) VALUES (
        ?,
        ?
      )
    `,[ title,user_id]
  );
  
  res.json({ message: 'postCreated' });
})

const port = process.env.PORT;

app.listen(port, function () {
  console.log(`server listening on port ${port}`);
})