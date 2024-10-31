const { Cart, CreateCart, RemoveCart } = require("../services/CartServiece");
const {
  ProductByREmark,
  ProductByBrand,
  ProductByCategory,
  ProductByCategoryLimit10,
  ProductSlider,
  ProductByKeyword,
} = require("../services/ProductService");
const { CreateWish, RemoveWish, Wish } = require("../services/WishService");

// Product Slider
exports.SliderList = async (req, res) => {
  const result = await ProductSlider(req);
  return res.status(200).json(result);
};

// Category List
exports.ListByCategory = async (req, res) => {
  const result = await ProductByCategory(req);
  return res.status(200).json(result);
};

// List By Similar Product
exports.ListBySimilar = async (req, res) => {
  const result = await ProductByCategoryLimit10(req);
  return res.status(200).json(result);
};

// Brand List
exports.ListByBrand = async (req, res) => {
  const result = await ProductByBrand(req);
  return res.status(200).json(result);
};

exports.ListByKeyword = async (req, res) => {
  const result = await ProductByKeyword(req);
  return res.status(200).json(result);
};

exports.ProductDetails = async (req, res) => {
  const result = await ProductByKeyword(req);
  return res.status(200).json(result);
};

exports.ListReview = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "ListReview",
  });
};

// List By Remark
exports.ListByRemark = async (req, res) => {
  const result = await ProductByREmark(req);
  return res.status(200).json(result);
};

// wishlist
exports.WishList = async (req, res) => {
  const result = await Wish(req);
  return res.status(200).json(result);
};

// Create wishlist
exports.CreateWishList = async (req, res) => {
  const result = await CreateWish(req);
  return res.status(200).json(result);
};

// Remove wishlist
exports.RemoveWishList = async (req, res) => {
  const result = await RemoveWish(req);
  return res.status(200).json(result);
};

// Cart List
exports.CartList = async (req, res) => {
  const result = await Cart(req);
  return res.status(200).json(result);
};

// Create Cart List
exports.CreateCartList = async (req, res) => {
  const result = await CreateCart(req);
  return res.status(200).json(result);
};

// Remove Cart List
exports.RemoveCartList = async (req, res) => {
  const result = await RemoveCart(req);
  return res.status(200).json(result);
};
