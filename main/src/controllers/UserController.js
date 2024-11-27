const { UserOTP, UsreVerify } = require("../services/UserService");
const { EncodeToken } = require("../utility/TokenHelper");

exports.UserLogin = async (req, res) => {
  const result = await UserOTP(req);
  res.status(200).json(result);
};

exports.VerifyLogin = async (req, res) => {
  const result = await UsreVerify(req);
  if (result["status"] === "success") {
    res.cookie("token", result["token"]); // For web cookie
    return res.status(200).json(result);
  }
};

exports.UserLogout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "UserLogout",
  });
};
