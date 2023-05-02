const express = require("express");
require("dotenv").config();
const { connection } = require("./db");
const { userRouter } = require("./router/user.router");
const { articleRouter } = require("./router/article.router");
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/article", articleRouter);

app.listen(process.env.PORT, async () => {
  await connection;
  console.log("server started");
});
