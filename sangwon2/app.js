
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
  res.status(201).json({ message: "sign-up complete" });
});
