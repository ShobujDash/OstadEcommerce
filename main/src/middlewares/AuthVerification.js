const jwt = require("jsonwebtoken");
const { DecodeToken } = require("../utility/TokenHelper");

module.exports = (req, res, next) => {
  let { token } = req.headers; // token from others
  if (!token) {
    token = req.cookies['token'] // token form web
  }


  let decoded = DecodeToken(token);
  if (decoded === null) {
    res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  } else {
    let { email, id } = decoded;
    req.headers.email = email;
    req.headers.id = id;
    next();
  }
};
