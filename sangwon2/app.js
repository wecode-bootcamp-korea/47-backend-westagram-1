// require("dotenv").config();

// import { db_host, db_user, db_pass } from "./db.js";

// console.log("DB_HOST:", process.env.DB_HOST);
// console.log("DB_USER:", process.env.DB_USER);
// console.log("DB_PASS:", process.env.DB_PASS);

// console.log({ db_host, db_user, db_pass });

// const express = require('express')
// const cors = require('cors')
// const app = express()
 
// app.use(cors())
 
// app.get('/ping', function (req, res, next) {
//   res.json({message: 'pong'})
// })
 
// app.listen(3000, function () {
//   console.log('server listening on port 3000')
// })



import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { DataSource } from 'typeorm';

dotenv.config();
const app = express();

app.use(cors());

const myDataSource = new DataSource({
  type: process.env.DB_CONNECTION,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

myDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
    app.get('/ping', function (req, res, next) {
      res.json({ message: 'pong' });
    });
  
    app.listen(3000, function () {
      console.log('server listening on port 3000');
    });
  })
  .catch(error => {
    console.error("Failed to initialize Data Source:", error);
  });



// 동현씨
// require("dotenv").config();

// const express = require("express");
// const logger = require("morgan");
// const cors = require("cors");
// const app = express();
// const { DataSource } = require("typeorm");

// const appDataSource = new DataSource({
//   type: process.env.DB_CONNECTION,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   username: process.env.DB_USERNAME,
//   password: process.env.DB_PASSWORD,
//     database: process.env.DB_DATABASE,
// });

// appDataSource.initialize().then(() => {
//   console.log("Data Source has been initialized!");
// });

// app.use(cors());
// app.use(logger("combined"));
// app.use(express.json());

// app.get("/ping", (req, res) => {
//   res.json({ msg: "ping" });
// });

// app.post("/pong", (req, res) => {
//   res.json({ msg: "pong" });
// });

// app.get("/ping", function (req, res, next) {
//   res.json({ message: "ping" });
// });

// app.post("/pong", function (req, res, next) {
//   res.json({ message: "pong" });
// });

// app.listen(3000, function () {
//   console.log("server listening on port 3000");
// });


//app.get