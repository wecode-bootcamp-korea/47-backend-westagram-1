require("dotenv").config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {appDataSource}=require("./models/dataSource")
const routes = require("./routes");
const app = express();



app.use(cors());
app.use(morgan('combined'));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  appDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during server startup", err);
      appDataSource.destroy();
    });
  console.log(`Server is listening on ${PORT}`);
});