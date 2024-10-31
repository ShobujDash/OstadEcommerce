const { AllCategoris } = require("../services/ProductService");

exports.CategoryList = async (req, res) => {
  let result = await AllCategoris();
  return res.status(200).json(result);
};
