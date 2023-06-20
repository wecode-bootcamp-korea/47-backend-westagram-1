const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { myDataSource } = require("./models/dataSource");

const routes = require("./routes");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(routes);

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

const PORT = process.env.PORT;

// const start = async () => {
app.listen(PORT, () => {
  myDataSource
    .initialize()
    .then(() => {
      console.log("Data Source has been initialized!");
    })
    .catch((err) => {
      console.error("Error occurred during server startup", err);
      myDataSource.destroy();
    });
  console.log(`Server is listening on ${PORT}`);
});
// try {
//   server.listen(PORT, () => console.log(`Server is listening on ${PORT}`));
// } catch (err) {
//   console.error(err);
// }
// };

// start();

// myDataSource
//   .initialize()
//   .then(() => {
//     console.log("Data Source has been initialized!");
//   })
//   .catch((err) => {
//     console.error("Error occured during Data Source initialization", err);
//     myDataSource.destroy();
//   });
