const mongoose = require("mongoose");
const WishModel = require("../models/WishModel");
const ObjectId = mongoose.Types.ObjectId;

// create wish list
const CreateWish = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    await WishModel.updateOne(
      { userID: user_id, productID: reqBody.productID },
      { $set: reqBody },
      { upsert: true }
    );

    return { status: "success", message: "Wish List Created" };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

// remove wish list
const RemoveWish = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    reqBody.userID = user_id;

    await WishModel.deleteOne({
      userID: user_id,
      productID: reqBody.productID,
    });

    return { status: "success", message: "Wish List Deleted" };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

// wish list
const Wish = async (req) => {
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
        '_id': 0,
        'userID': 0,
        'createdAt': 0,
        'updatedAt': 0,
        "product._id": 0,
        "product.categoryID": 0,
        "product.brandID": 0,
        "brand._id": 0,
        "category._id": 0,
      },
    };

    let data = await WishModel.aggregate([
      matchStage,
      JoinStageProduct,
      unwindProductStage,
      JoinStageBrand,
      unwindBrandStage,
      JoinStageCategory,
      unwindCategoryStage,
      projectionStage
    ]);

    return { status: "success", message: data };
  } catch (error) {
    return { statu: "fail", message: "Something went wrong" };
  }
};

module.exports = { CreateWish, RemoveWish, Wish };
