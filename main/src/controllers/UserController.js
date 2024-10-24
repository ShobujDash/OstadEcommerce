const UserModel = require("../models/UserModel");
const { EncodeToken } = require("../services/UserService/TokenHelper");
const UserOTPService = require("../services/UserService/UserOTPService");
const UserVerifyService = require("../services/UserService/UserVerifyService");
const sendEmailUtilitiys = require("../utility/SendEmail");

exports.UserLogin = async (req, res) => {
  let { email } = req.params;
  console.log(email);
  let code = Math.floor(100000 + Math.random() * 900000);
  let EmailText = "Your Verificatin code is " + code;

  try {
    await sendEmailUtilitiys(email, EmailText, "PIN Email Verification");
    await UserOTPService(code, email, UserModel);
    return res.status(200).json({
      success: true,
      message: "Email Sent",
    });
  } catch (error) {
    return res.status(400).json({
      success: "fail",
      message: "Something went wrong",
    });
  }
};

exports.VerifyLogin = async (req, res) => {

  const { email, otp } = req.params;

  let verifyresult = await UserVerifyService(otp, email, UserModel);

  if (verifyresult === 1) {
    
    // create jwt token
    let token = EncodeToken(email)
    await UserOTPService("0",email,UserModel)

      return res.status(200).json({
        success: true,
        message: "VerifyLogin",
        token
      });
  } else {
      return res.status(200).json({
        success: false,
        message: "Invalid OTP",
      });
  }
  



};

exports.UserLogout = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "UserLogout",
  });
};
