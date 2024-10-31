const ProfileModel = require("../models/ProfileModel");
const UserModel = require("../models/UserModel");
const sendEmailUtilitiys = require("../utility/SendEmail");
const { EncodeToken } = require("../utility/TokenHelper");

// User OTP
const UserOTP = async (req) => {
  try {
    let { email } = req.params;
    console.log(email);
    let code = Math.floor(100000 + Math.random() * 900000);
    let EmailText = "Your Verificatin code is " + code;
    await sendEmailUtilitiys(email, EmailText, "PIN Email Verification");
    await UserModel.findOneAndUpdate(
      { email: email }, // Filter by email
      { otp: code }, // Update the otp
      { upsert: true, new: true } // Insert if not exists, return the new document
    );
    return { status: "success", message: "6 Digit OTP has been send" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

// User Verify
const UsreVerify = async (req) => {
  try {
    const { email, otp } = req.params;

    let code = req.params.otp;

    if (code === "0") {
      return { status: "fail here", message: "Something went wrong" };
    } else {
      let total = await UserModel.countDocuments({ email: email, otp: code });
      console.log(total);

      if (total === 1) {
        let user_id = await UserModel.find({ email: email, otp: code }).select(
          "_id"
        );
        // user_id = [ { _id: new ObjectId('671d3354b086b21dc4cca94f') } ]
        let token = EncodeToken(email, user_id[0]["_id"]).toString();

        await UserModel.findOneAndUpdate(
          { email: email }, // Filter by email
          { otp: "0" }, // Update the otp
          { upsert: true, new: true } // Insert if not exists, return the new document
        );

        return { status: "success", message: "Valid OTP", token: token };
      } else {
        return { status: "Fail to hrere", message: "Something went Wrong" };
      }
    }
  } catch (error) {
    return { status: "fail error", message: "Something went wrong" };
  }
};

// Crate user Profile and update
const UserProfileSave = async (req) => {
  let user_id = req.headers.id;
  let reqBody = req.body;
  reqBody.userID = user_id;
  console.log(reqBody);
  try {
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Changed" };
  } catch (error) {
    return { status: "fail", message: "Something went wrong" };
  }
};

// get Profile data
const UserProfileDetails = async (req) => {
  

  try {
    let user_id = req.headers.id;
    let data = await ProfileModel.find({ userID: user_id });
    return {status:"success",data:data}
  } catch (error) {
       return { status: "fail", message: "Something went wrong" };
  }
}




module.exports = { UserOTP, UsreVerify, UserProfileSave, UserProfileDetails };
