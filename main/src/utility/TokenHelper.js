const jwt = require('jsonwebtoken');

exports.EncodeToken =  (email,id) => {
  return jwt.sign({ email: email ,id:id}, process.env.JWT_SECRET, {
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
