const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (token) {
    const decode = jwt.verify(token.split(" ")[1], "masai");
    console.log(decode);
    if (decode) {
      req.body.userId = decode.userId;
      req.body.user = decode.user;
      next();
    } else {
      res.status(400).send({ msg: "unauthorized access" });
    }
  } else {
    res.status(400).send({ msg: "unauthorized access" });
  }
};

module.exports = { auth };
