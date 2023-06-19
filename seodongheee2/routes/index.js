const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const postRouter = require("./postRouter");

router.use("/users", userRouter.router);
router.use("/users",postRouter.router);

module.exports = router;