const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://ankitabarad2111:ankitabarad@cluster0.fo2jvwy.mongodb.net/blog_backend?retryWrites=true&w=majority"
);

module.exports = { connection };
