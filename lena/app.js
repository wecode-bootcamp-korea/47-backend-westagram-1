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




app.post('/signup', async (req, res) => {
    try {
        const { name, email, profile_image, password} = req.body;

        const result = await appDataSource.query("INSERT INTO users (name, email, profile_image, password) VALUES (?, ?, ?, ?)", 
        [users.name, users.email, users.profile_image, users.password])

        res.json({message: 'userCreated'})
        
    } catch (error) {
        res.json({error})

    }})












const server = http.createServer(app)
const PORT = process.env.PORT;

const start = async() => {
    server.listen(PORT, () => console.log(`server is listening on ${PORT}`))
}
   
start()
