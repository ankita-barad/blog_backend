const express = require("express");
const { UserModel } = require("../model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const swaggerJsdoc = require('swagger-jsdoc');











const userRouter = express.Router();
var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
userRouter.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
    { stream: accessLogStream }
  )
);

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password, city, age } = req.body;
    bcrypt.hash(password, 6, async (err, hash) => {
      let newUser = new UserModel({
        name,
        email,
        password: hash,
        city,
        age,
      });
      await newUser.save();
      res.status(200).send({ msg: "User registerd" });
    });
  } catch (error) {}
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
  console.log(user);
  if (user) {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        const token = jwt.sign({ userId: user._id, user: user.name }, "masai");
        res.status(200).json({ msg: "Logged In successfully", token: token });
      } else {
        res.status(400).send({ msg: "Wrong Credentials" });
      }
    });
  } else {
    res.status(400).send({ msg: "Wrong Credentials" });
  }
});

module.exports = { userRouter };

// name: { type: String },
// email: { type: String },
// password: { type: String },
// city: { type: String },
// age: { type: Number },
