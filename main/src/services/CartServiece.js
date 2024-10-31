const mongoose = require("mongoose");
const WishModel = require("../models/WishModel");
const ProductModel = require("../models/ProductModel");
const CartModel = require("../models/CartModel");
const ObjectId = mongoose.Types.ObjectId;

// create wish list
const CreateCart = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    let productID = reqBody.productID;
    console.log("first",reqBody)

    // price calculation
    let product = await ProductModel.findOne({ _id: productID });
    let price = product.price;
    if (product.discoutn) {
      price = product.descountPrice;
    }
    let totalPrice = price * reqBody.qty;

    reqBody.userID = user_id;
    reqBody.price = totalPrice;
    console.log("after",reqBody)

    await CartModel.updateOne(
      { userID: user_id, productID: reqBody.productID },
      { $set: reqBody },
      { upsert: true }
    );

    return { status: "success", message: "Cart List Created" };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

// remove Cart list
const RemoveCart = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    await CartModel.deleteOne({
      userID: user_id,
      productID: reqBody.productID,
    });

    return { status: "success", message: "Cart item Deleted" };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

// Cart list
const Cart = async (req) => {
  try {
    let user_id = new ObjectId(req.headers.id);

    let matchStage = { $match: { userID: user_id } };

    let JoinStageProduct = {
      $lookup: {
        from: "products",
        localField: "productID",
        foreignField: "_id",
        as: "product",
      },
    };

    let unwindProductStage = { $unwind: "$product" };

    let JoinStageBrand = {
      $lookup: {
        from: "brands",
        localField: "product.brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let unwindBrandStage = { $unwind: "$brand" };
    let JoinStageCategory = {
      $lookup: {
        from: "categories",
        localField: "product.categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };

    let projectionStage = {
      $project: {
        _id: 0,
        userID: 0,
        createdAt: 0,
        updatedAt: 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await CartModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage,
    ]);

    return { status: "success", message: data };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

module.exports = { CreateCart, RemoveCart, Cart };
