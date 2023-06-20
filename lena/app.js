const http = require('http');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();

const { DataSource } = require('typeorm')

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
app.post('/posty', async (req, res) => {
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
app.get('/allpost', async (req, res) => {
        await appDataSource.query(
            `SELECT 
             users.id as userId,
             profile_image as userProfileImage,
             posts.id as postingId,
             posts.content as postingContent
             FROM users
             JOIN posts on users.id = posts.user_id
             `,   (err, rows) => {
               res.status(200).json({"data": rows});
       
    });
});

/*
//one user's posts
app.get('/onepost', async (req, res) => {
   // const givenid = req.params.id
   // var queryData = url.parse(req.url, true).query;
    await appDataSource.query(
        `SELECT 
         users.id as userId,
         profile_image as userProfileImage,
         posts.id as "postings.postingId",
         posts.content as "postings.postingContent"
         FROM users
         JOIN posts on users.id = posts.user_id
         WHERE users.id= 1`//, queryData['id']
         ,   (err, rows) => {
           res.status(200).json({"data": rows});
   
});
});
*/

//req it by doing userid/49 (say 49 is the id num); this is just the format
app.get('/userid/:id', async (req, res) => {
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

    

//test function just to help test
 app.get('/alldata', async (req, res) => {
    // const givenid = req.params.id
    // var queryData = url.parse(req.url, true).query;
     await appDataSource.query(
         `SELECT * from users
          left join posts on posts.user_id = users.id`//, queryData['id']
          ,   (err, rows) => {
            res.status(200).json({"data": rows});
    
 });
 });



const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}
   
start()
