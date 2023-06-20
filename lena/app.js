const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const { DataSource } = require('typeorm');
const { error } = require('console');

const appDataSource = new DataSource({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

appDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!")
    });

const app = express();

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', function (req, res, next) {
    res.json({message: 'pong'})
  })

//회원가입 request handling
app.post('/signup', async (req, res) => {
    try {
        const { name, email, profileImage, password} = req.body;

        await appDataSource.query(
            `INSERT INTO users (
                name, 
                email, 
                profile_image, 
                password
            ) VALUES (?, ?, ?, ?);
            `,
            [name, email, profileImage, password]
        );

        res.status(201).json({message: 'userCreated'});
        
    } catch (error) {
        res.json({message: 'Failed to create user'});
        console.error("ERROR");
    }});


//posts
app.post('/post', async (req, res) => {
    try {
        const {title, content, userId} = req.body;

        await appDataSource.query(
            `INSERT INTO posts (
                title,
                content,
                user_id
            ) VALUES (?, ?, ?);
            `,
            [title, content, userId]
        );
        res.status(301).json({message: 'postCreated'});
    } catch (error) {
        res.json({message: 'Failed to create post'});
        console.error("ERROR");
    }});

//get all posts
app.get('/getallposts', async (req, res) => {
        await appDataSource.query(
            `SELECT 
             users.id as userId,
             profile_image as userProfileImage,
             posts.id as postingId,
             posts.content as postingContent
             FROM users
             INNER JOIN posts on users.id = posts.user_id
             `,   (err, rows) => {
               res.status(200).json({"data": rows});
       
    });
});


//req it by doing getpostbyuser/userid/49 (say 49 is the id num); this is just the format
app.get('/getpostbyuser/userid/:id', async (req, res) => {
    const givenid = req.params.id
    // var queryData = url.parse(req.url, true).query;
     try {
        const inner = await appDataSource.query(
            
         `SELECT 
          users.id as userId,
          users.profile_image as userProfileImage,
          posts.id as postingId,
          posts.content as postingContent
          FROM users
          INNER JOIN posts on posts.user_id = users.id
          WHERE users.id = ?`, [givenid])

        const outer = {
            userId : inner[0].userId,
            userProfileImage : inner[0].userProfileImage,
            postings: inner.map((p) => ({
                postingId : p.postingId,
                postingTitle : p.postingTitle,
                postingContent: p.postingContent
            }))}

        res.json({"data" : outer})
    } catch (error) {
        res.status(401).json({message: `Failed to retrieve posts from user ${givenid}`});
    }});

    
//edit post
app.post('/editpost/userid/:user_id/postid/:post_id/content/:new_content', async (req, res) => {
    const new_content = req.params.new_content
    const post_id = req.params.post_id
    const user_id = req.params.user_id

    try {
        await appDataSource.query(
            `UPDATE posts
            SET posts.content = ?
            WHERE posts.id = ? and posts.user_id = ?`,
            [new_content, post_id, user_id]
        )

        const newPost = await appDataSource.query(
            `SELECT 
            users.id as userId,
            users.name as userName,
            posts.id as postingId,
            posts.title as postingTitle,
            posts.content as postingContent
            FROM users
            INNER JOIN posts on posts.user_id = users.id
            WHERE users.id = ? and posts.id = ?`, 
            [user_id, post_id]
        )

        res.json({"data" : newPost})
    
    } catch {
        res.json({message: "Failed to edit post"})
}});


app.post('/deletepost/:id', async (req, res) => {
    const post_id = req.params.id
    try {
        await appDataSource.query(
            `DELETE FROM posts
            WHERE posts.id = ?`,
            [post_id]
            )
        res.json({message: "postingDeleted"})
    } catch {
        res.json("Failed to delete post")
    }

})

app.post('/likepost/user/:user_id/post/:post_id', async (req, res) => {
    const user_id = req.params.user_id
    const post_id = req.params.post_id
    try {
        await appDataSource.query(
            `INSERT INTO likes (
                user_id,
                post_id
            ) VALUES (?, ?)`,
            [user_id, post_id]
            )
        res.json({message: "likeCreated"})
    } catch {
        res.json("Failed to like post")
    }
}
);



// //test function just to help test
//  app.get('/alldata', async (req, res) => {
//     // const givenid = req.params.id
//     // var queryData = url.parse(req.url, true).query;
//      await appDataSource.query(
//          `SELECT * from users
//           inner join posts on posts.user_id = users.id`
//           ,   (err, rows) => {
//             res.status(200).json({"data": rows});
    
//  });
//  });



const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}
   
start()
