//built-in package
const http = require('http');

// 3rd party package
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { DataSource } = require('typeorm');

//custom package
const app = express();

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

app.use(express.json());
app.use(cors())
app.use(morgan('dev'))

app.get('/ping', function (req, res, next) {
    res.status(400).json({message: 'pong'})
  })


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
        res.status(400).json({message: 'Failed to create user'});
}});


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
        res.status(201).json({message: 'postCreated'});
    } catch (error) {
        res.status(400).json({message: 'Failed to create post'});
    }});

app.get('/posts', async (req, res) => {
    const posts = await appDataSource.query(
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
    res.status(200).json({"data": posts});
});


app.get('/posts/user/:userId', async (req, res) => {
    const userId = req.params.userId
     try {
        const inner = await appDataSource.query(
            
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

        res.status(200).json({"data" : outer})
    } catch (error) {
        res.status(400).json({message: `Failed to retrieve posts from user ${givenid}`});
    }});

    
app.post('/user/:userId/post/:postId/content/:content', async (req, res) => {
    const content = req.params.content
    const postId = req.params.postId
    const userId = req.params.userId

    try {
        await appDataSource.query(
            `UPDATE posts
            SET posts.content = ?
            WHERE posts.id = ? and posts.user_id = ?`,
            [content, postId, userId]
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
            [userId, postId]
        )
        res.status(201).json({"data" : newPost})

    } catch {
        res.status(400).json({message: "Failed to edit post"})
}});


app.delete('/post/:postId', async (req, res) => {
    const postId = req.params.postId
    try {
        await appDataSource.query(
            `DELETE FROM posts
            WHERE posts.id = ?`,
            [postId]
            )
        res.status(201).json({message: "postingDeleted"})
    } catch {
        res.status(400).json("Failed to delete post")
    }

})

app.post('/user/:userId/post/:postId/likes', async (req, res) => {
    const userId = req.params.userId
    const postId = req.params.postId
    try {
        await appDataSource.query(
            `INSERT INTO likes (
                user_id,
                post_id
            ) VALUES (?, ?)`,
            [userId, postId]
            )
        res.status(201).json({message: "likeCreated"})
    } catch {
        res.status(400).json("Failed to like post")
    }
}
);


const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}
   
start()
