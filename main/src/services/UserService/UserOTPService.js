const UserOTPService = async (code,email,DataModel) => {
  
  await DataModel.findOneAndUpdate(
    { email: email }, // Filter by email
    { otp: code }, // Update the otp
    { upsert: true, new: true } // Insert if not exists, return the new document
  ); 
}

module.exports = UserOTPService
