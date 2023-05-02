const mongoose = require("mongoose");

const articleSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  user: { type: String },
  userId: { type: String },
  category: { type: String },
  live: { type: Boolean },
});

const ArticleModel = mongoose.model("article", articleSchema);

module.exports = { ArticleModel };
