const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./router/user.router");
const { articleRouter } = require("./router/article.router");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/article", articleRouter);

app.listen(3300, async () => {
  await connection;
  console.log("server started");
});
