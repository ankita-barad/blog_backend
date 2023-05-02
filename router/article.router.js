const express = require("express");
const { ArticleModel } = require("../model/article.model");
const { auth } = require("../middleware/auth");
const fs = require("fs");
const path = require("path");
const morgan = require("morgan");

const articleRouter = express.Router();

var accessLogStream = fs.createWriteStream(path.join(__dirname, "access.log"), {
  flags: "a",
});
articleRouter.use(
  morgan(
    ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]',
    { stream: accessLogStream }
  )
);

articleRouter.post("/add", auth, async (req, res) => {
  const { title, body, category, live } = req.body;
  try {
    const newArticle = new ArticleModel({
      title,
      body,
      user: req.body.user,
      userId: req.body.userId,
      category,
      live,
    });
    await newArticle.save();
    res.status(200).send({ msg: "new aricle is created" });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

articleRouter.get("/", auth, async (req, res) => {
  try {
    const { page, limit } = req.query;
    let skip;
    if (page) {
      skip = (page - 1) * limit;
    } else {
      skip = 0;
    }
    const articles = await ArticleModel.find().skip(skip).limit(limit);
    res.status(200).send({ articles: articles });
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

articleRouter.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne({ _id: id });
    // console.log(req.body.userId, article.userId);
    if (req.body.userId !== article.userId) {
      res.status(400).send({ msg: "unauthorized access" });
    } else {
      const articles = await ArticleModel.find({ userId: article.userId });
      res.status(200).send({ articles: articles });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

articleRouter.patch("/edit/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne({ _id: id });
    // console.log(req.body.userId, article.userId);
    if (req.body.userId !== article.userId) {
      res.status(400).send({ msg: "unauthorized access" });
    } else {
      const articles = await ArticleModel.findByIdAndUpdate(
        { _id: id },
        req.body
      );
      res.status(200).send({ msg: "article updated" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

articleRouter.delete("/rem/:id", auth, async (req, res) => {
  const { id } = req.params;
  try {
    const article = await ArticleModel.findOne({ _id: id });
    // console.log(req.body.userId, article.userId);
    if (req.body.userId !== article.userId) {
      res.status(400).send({ msg: "unauthorized access" });
    } else {
      const articles = await ArticleModel.findByIdAndDelete({ _id: id });
      res.status(200).send({ msg: "article deleted" });
    }
  } catch (error) {
    res.status(400).send({ msg: error });
  }
});

module.exports = { articleRouter };

// title: { type: String },
// body: { type: String },
// user: { type: String },
// userId: { type: String },
// category: { type: String },
// live: { type: Boolean },
