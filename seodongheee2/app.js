require('dotenv').config();
//환경변수에 적은 typeorm에 관한 것을 app.js에서 발동시킬수 있는것


const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { DataSource } = require('typeorm');

// 모듈로서 활용하기 위해 require 매소드를 씀

const appDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

//데이터소스라는 변수는 메소드로써 활용할수 있게 env 경로를 통해 

appDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');
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

// app.get('/users', async function (req, res, next) {
//   const users = await appDataSource.query(`
//     SELECT
//     id,
//     email,
//     password
//     FROM users
//   `);
//   res.json({ data: users });
// });

// app.post('/users', async function (req, res, next) {
//   console.log(req.body);
//   const { email, password } = req.body;

//   await appDataSource.query(
//     `
//     INSERT INTO users(
//       email,
//       password
//     ) VALUES (
//       ?,
//       ?,
//       ?,
//       ?
//     )
//   `,
//     [email, password]
//   );
//   res.json({ message: 'SUCCESS_CREATE_USER' });
// });





const port = process.env.PORT;
app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});