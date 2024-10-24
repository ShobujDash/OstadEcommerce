const jwt = require('jsonwebtoken');

exports.EncodeToken =  (email) => {
  return jwt.sign({ email: email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  }); 
}

exports.DecodeToken = (token) => {
  
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null
  }

  
}
