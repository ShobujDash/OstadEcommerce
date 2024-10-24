const UserVerifyService = async (code, email, DataModel) => {
  if (code === 0) {
    return 0;
  } else {
    return await DataModel.countDocuments({ email: email, otp: code });
  }
};

module.exports = UserVerifyService;
