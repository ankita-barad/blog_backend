const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: { type: String },
  email: { type: String },
  password: { type: String },
  city: { type: String },
  age: { type: Number },
});

const UserModel = mongoose.model("user", userSchema);

module.exports = { UserModel };

// "name": "komal",
// "email": "kom@gmail.com",
// "password": "kom123",
// "city": "banglore",
// "age": 25
