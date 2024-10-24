exports.CreateProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "CreateProfile",
  });
};
exports.ReadProfile = async (req, res) => {

  const { email, id } = req.headers;


  return res.status(200).json({
    success: true,
    message: email
  });
};
exports.UpdateProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "UpdateProfile",
  });
};
