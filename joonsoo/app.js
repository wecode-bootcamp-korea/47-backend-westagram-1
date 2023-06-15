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

app.post('/users', async function (req, res, next) {
  const { name, email, profileImage, password } = req.body;
  
  try {
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
    [name, email, profileImage, password]
  );
  res.status(201).json({ message: 'SUCCESS_CREATE_USER' });
} catch (error) {
  console.error('ERROR_DURING_USER_CREATION:', error);
  res.status(500).json({message: 'FAILED_CREATE_USER'});
}
});

const port = process.env.PORT;
app.listen(port, function () {
  console.log(`server listening on port ${port}`);
});